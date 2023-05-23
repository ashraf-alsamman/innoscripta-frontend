import React from 'react';
import RemoveHTMLTags from './RemoveHTMLTags';
/* @ts-ignore */
import moment from 'moment';

const ArticleComponent: React.FC<{ article: any }> = ({ article }) => {
  return (
    <div className="article input-group mb-4 w-100 p-4 row m-0">
      <div className="left-box">
        <h3 className="article-title"><RemoveHTMLTags text={article.title}/> </h3>
        <p className="article-content"><RemoveHTMLTags text={article.content}/></p>
      </div>
      <div className="right-box p-1">
        <p className="article-info">published at : {moment(article.published_at).format('MMMM Do YYYY, h:mm:ss a') }</p>
        <p className="article-info">Category: {article.category}</p>
        <p className="article-info">Source: {article.source}</p>
        <p className="article-info">Author: {article.author}</p>
      </div>
    </div>
  );
};

export default ArticleComponent;