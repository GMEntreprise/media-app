// Librairy

// Components
import Form from "@/components/UI/Form";
import { Header } from "@/components/UI/Header";
import PostFeed from "@/components/posts/PostFeed";

export default function Home() {
  // Function

  return (
    <>
      <Header label="Acceuil" />
      <Form placeholder="Qu'est-ce qui se passe ?" />
      <PostFeed />
    </>
  );
}
