import React, { useState, useEffect } from "react";

import { getPublicContent } from "../services/user.service";

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getPublicContent().then(
      (response) => {
        setContent(response.data.email);
      },
      (error) => {
        const _content =
          (error.response && error.response.data.detail) ||
          error.message ||
          error.toString();
        console.log("_content", _content);
        setContent(JSON.stringify(_content));
        // setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {/* <h3>{JSON.stringify(content)}</h3> */}
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;
