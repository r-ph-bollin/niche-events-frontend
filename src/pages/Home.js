import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// components

import Editor from "../components/Editor";

const Home = () => {
  return (
    <div className="home">
      <h2>We are at Home</h2>
      <Editor />
    </div>
  );
};

export default Home;
