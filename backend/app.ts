import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay can be added here if needed
  res.json(posts);
});

// Get a specific post by ID
app.get("/api/posts/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = posts.find((p) => p.id === id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const user = findUserById(post.userId); // Assuming posts have a userId
    const authorName = post.userId && user?.email ? user.email.split("@")[0] : "Anonymous";

    res.json({ ...post, email: user?.email || "unknown@example.com", authorName });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

/**
 * Authorization and validation issues addressed here:
 * (1) Check for valid token before allowing post creation.
 * (2) Validate the payload to ensure required fields are present.
 */
app.post("/api/posts", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");

    const { title, category, content, image } = req.body;
    if (!title || !category || !content || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newPost = {
      id: posts.length + 1, // Auto-increment ID
      title,
      category,
      content,
      image,
      userId: (decodedUser as IDecodedUser).id, // Add logged-in user's ID
    };

    addPost(newPost);
    res.status(200).json({ success: true, post: newPost });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Update an existing post
app.put("/api/posts/:id", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");

    const id = parseInt(req.params.id, 10);
    const postIndex = posts.findIndex((p) => p.id === id);

    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    const existingPost = posts[postIndex];
    if (existingPost.userId !== (decodedUser as IDecodedUser).id) {
      return res.status(403).json({ error: "You can only edit your own posts" });
    }

    const { title, category, content, image } = req.body;
    if (!title || !category || !content || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedPost = {
      ...existingPost,
      title,
      category,
      content,
      image,
    };

    posts[postIndex] = updatedPost;
    res.status(200).json({ success: true, post: updatedPost });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
