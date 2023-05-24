import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyArticles } from '../redux/articlesSlice';
import ArticleComponent from '../components/ArticleComponent';
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

const MyArticles = () => {
    const dispatch = useDispatch();
    const { myArticles, loading, error } = useSelector((state: any) => state.articles);

    useEffect(() => {
        dispatch(fetchMyArticles() as any);
    }, []);

    if (error) {
        return <>Error: {error}</>
    }
    if (  loading ) {
        return <Loading text="Fetching new articles based on your saved preferences. Please wait ..." />;
    }

    if (myArticles && myArticles.data && myArticles.data.length === 0) {
        
            return <>
            <div className="note-container">
                <p className="message" >
                You do not have any preferences 
                </p>
                <Link to="/preferences" className="note-link">
                    Go to preferences
                </Link>
            </div>
        </>;
        
     }
    return (
        <div className="container">
            <h4>MY Articles</h4>
            {myArticles && myArticles.data && myArticles.data.data && myArticles.data.data.map((article: any) => (
                <ArticleComponent key={article.id} article={article} />
            ))}
        </div>
    );
};

export default MyArticles;
