import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchArticles } from "../../articleService";
import ReviewArticleCard from "../ReviewArticleCard/ReviewArticleCard"; // Import new component
import "./CurrentIssues.css";

const CurrentIssues = ({admin}) => {
  const navigate = useNavigate();
  const [fetchedArticles, setFetchedArticles] = useState([]);
  const pendingFolderPath = "pending";

  useEffect(() => {
    const loadArticles = async () => {
      const articles = await fetchArticles(pendingFolderPath);
      setFetchedArticles(articles);
    };

    loadArticles();
  }, []);

  const handleArticleReviewed = (articleId) => {
    setFetchedArticles(fetchedArticles.filter(article => article.id !== articleId));
  };

  return (
    admin ? ( <div className="articles-container">
      <button
        onClick={() => navigate("/")}
        className="back-to-home"
        style={{ marginBottom: "5px" }}
      >
        Back to Home
      </button>

      <ReviewArticleCard articles={fetchedArticles} onArticleReviewed={handleArticleReviewed} />
    </div> ): (<h1>You are not authorised to access this page</h1>)
  );
};

export default CurrentIssues;
