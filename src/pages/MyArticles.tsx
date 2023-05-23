import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyArticles } from '../redux/articlesSlice';
import ArticleComponent from '../components/ArticleComponent';
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../components/Loading';

const MyArticles = () => {
    const dispatch = useDispatch();
    const { myArticles, loading, error } = useSelector((state: any) => state.articles);
  
    useEffect(() => {
        dispatch(fetchMyArticles( ) as any);
     }, [ ]);

  
   
     if (error) {
        return <>Error: {error}</>
    }
    // if (!myArticles || !myArticles.data|| myArticles.data.length === 0 ) {
    //     return <p>The array is empty.</p>;
    // }
    if (!myArticles || !myArticles.data|| !myArticles.data.data) {
        return <Loading text="Fetching new articles based on your saved preferences. Please wait ..." /> ;
    }


    return (
        <div className="container">
            <h4>MY Articles</h4>
            {myArticles.data.data.map((article: any) => (
                <ArticleComponent key={article.id} article={article} />
            ))}


        </div>
    );
};

export default MyArticles;
