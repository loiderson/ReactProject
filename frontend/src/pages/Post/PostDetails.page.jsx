import { Link, useLoaderData, useNavigate } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, Text, Image, Group, Space } from "@mantine/core";
import { findUserById } from "../../../../backend/fakedb";

// Loader to fetch post details
export const postDetailsLoader = async ({ params }) => {
  const { id } = params;
  const response = await axios.get(`${DOMAIN}/api/posts/${id}`);
  return response.data;
};

function PostDetailsPage() {
  const post = useLoaderData(); // Get the loaded post details from the loader
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Extract the author name from the userId associated with the post
  const author = post.userId ? findUserById(post.userId) : null;
  const authorName = author ? author.email.split("@")[0] : "Anonymous";

  // Debugging: Log the post object
  console.log(post);

  // Handle navigation to the edit page
  const handleEdit = () => {
    navigate(`/posts/${post.id}/edit`);
  };

  return (
    <Container>
      <Group align="flex-start">
        {/* Post details */}
        <div>
          <Text size="xl" weight="bold">
            Author: {authorName}
          </Text>
          <Space h="sm" />
          <Text size="lg" weight="bold">
            Title: {post.title || "Untitled"}
          </Text>
          <Space h="sm" />
          <Text size="sm" color="dimmed">
            Category: {post.category || "Uncategorized"}
          </Text>
          <Space h="md" />
          <Text size="md">{post.content || "No content available."}</Text>
          <Space h="md" />

          {/* Show Edit button if the post belongs to the logged-in user */}
          {loggedInUser?.id === post.userId && (
            <Button color="blue" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </div>

        {/* Post image */}
        <Image
          src={post.image}
          alt={post.title || "Post image"}
          width={300}
          height={200}
          withPlaceholder
          radius="md"
        />
      </Group>

      <Space h="xl" />

      {/* Back to Posts button */}
      <Button variant="light">
        <Link to="/posts">Back to Posts</Link>
      </Button>
    </Container>
  );
}

export default PostDetailsPage;
