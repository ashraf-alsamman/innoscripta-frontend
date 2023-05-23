import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../redux/articlesSlice';
import ArticleComponent from '../components/ArticleComponent';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from '../components/Loading';

const Articles = () => {
    const dispatch = useDispatch();
    const { articles, loading, error } = useSelector((state: any) => state.articles);
    const [filters, setFilters] = useState({ date: '', category: '', source: '', page: 1, perPage: 10 });
    const [clonedArticles, setClonedArticles] = useState<any[]>([]);
    const [first_int, setFirst_int] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const date = urlParams.get('date') || '';
        const category = urlParams.get('category') || '';
        const source = urlParams.get('source') || '';
        const page = urlParams.get('page') || '1';
        const perPage = urlParams.get('perPage') || '10';
        setFilters({ date, category, source, page: parseInt(page), perPage: parseInt(perPage) });
    }, []);

    useEffect(() => {
        if (first_int) {
            if (articles.data && articles.data.data) {
                setClonedArticles([...articles.data.data]);
                setFirst_int(false);
            } else {
                // articles.data.data is not loaded. 
            }
        }
    }, [articles, first_int]);



    useEffect(() => {
        dispatch(fetchArticles(filters) as any);
        updateURL(filters);
    }, [ filters]);

    const updateURL = (filters: { date: string, category: string, source: string, page: number, perPage: number }) => {
        const urlParams = new URLSearchParams();

        if (filters.date) {
            urlParams.set('date', filters.date);
        }
        if (filters.category) {
            urlParams.set('category', filters.category);
        }
        if (filters.source) {
            urlParams.set('source', filters.source);
        }
        if (filters.page) {
            urlParams.set('page', filters.page.toString());
        }
        if (filters.perPage) {
            urlParams.set('perPage', filters.perPage.toString());
        }

        const newURL = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState(null, '', newURL);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        if (e.target.name === 'perPage') {
            setFilters({ ...filters, perPage: parseInt(value, 10), page: 1 });
        } else {
            setFilters({ ...filters, [e.target.name]: value });
        }
    };

    const handleDateFilterChange = (e: any) => {
        setFilters({ ...filters, date: e });
    };

    const handlePageChange = (newPage: number) => {
        setFilters({ ...filters, page: newPage });
    };

    const handleResetFilters = () => {
        setFilters({ date: '', category: '', source: '', page: 1, perPage: 10 });
    };

    if (loading) {
        return <Loading text="Fetching news articles. Please wait..." /> ;
    }

    if (error) {
        return <>Error: {error}</>
    }

    if (!articles || !articles.data || !articles.data.data) {
        return <Loading text="Fetching news articles. Please wait..." /> ;
    }
    const today = new Date();
    return (
        <div className="container">
            <h4>Latest Articles</h4>
            <div className="row">
                <div className="col-3">
                    <DatePicker
                        selected={filters.date ? new Date(filters.date) : null}
                        name="date"
                        onChange={handleDateFilterChange}
                        dateFormat="yyyy-MM-dd"
                        className="DatePickerStyle"
                        maxDate={today}
                        placeholderText="Select a date"
                    />
                </div>

                <div className="col-3">
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="category" value={filters.category} onChange={handleFilterChange}>
                        <option value="">All Categories</option>
                        {clonedArticles && Array.from(new Set(clonedArticles.map((article: any) => article.category))).map((category: string) => (
                            <option value={category} key={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className="col-3">
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="source" value={filters.source} onChange={handleFilterChange}>
                        <option value="">All Sources</option>
                        {clonedArticles && Array.from(new Set(clonedArticles.map((article: any) => article.source))).map((source: string) => (
                            <option value={source} key={source}>{source}</option>
                        ))}
                    </select>
                </div>


                <div className="col-3">
                    <button onClick={handleResetFilters} className='btn btn-secondary btn-lg'>Reset Filters</button>
                </div>
            </div>

            {articles.data.data.map((article: any) => (
                <ArticleComponent key={article.id} article={article} />
            ))}

        </div>
    );
};

export default Articles;
