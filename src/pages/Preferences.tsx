import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Multiselect from 'multiselect-react-dropdown';
import { selectPreferences, fetchMyPreferences, fetchPreferences, savePreferences } from '../redux/preferenceSlice';
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom';



const Preferences: React.FC = () => {
    const dispatch = useDispatch();
    const SelectPreferences = useSelector(selectPreferences);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchMyPreferences() as any);
            await dispatch(fetchPreferences() as any);
        };
        fetchData();
    }, []);


    const [categories, setCategories] = useState<[]>(SelectPreferences.myPreferences.categories);
    const [authors, setAuthors] = useState<[]>(SelectPreferences.myPreferences.authors);
    const [sources, setSources] = useState<[]>(SelectPreferences.myPreferences.sources);

    const handleCategoryChange = (selectedOptions: any) => { setCategories(selectedOptions); };
    const handleAuthorChange = (selectedOptions: any) => { setAuthors(selectedOptions); };
    const handleSourceChange = (selectedOptions: any) => { setSources(selectedOptions); };

    const handleSavePreferences = () => {
        const userPreferences: any = { categories, authors, sources }

        dispatch(savePreferences(userPreferences) as any)
            .unwrap()
            .then(() => {
                navigate('/articles/my');
            })
            .catch((err: any) => {
                alert(err.message);
            });
    };

    return (
        <>
            {SelectPreferences && SelectPreferences['loading'] ? (
                <Loading text="Loading your preferences please wait ..." />
            ) : (
                <div className='container'>
                    <div className="row">
                        <h3>Preferences</h3>
                        <hr />
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                            <h3>categories</h3>
                            {
                                SelectPreferences.preferences && SelectPreferences.preferences.categories
                                    && SelectPreferences.preferences.categories.length > 0 ? (
                                    <Multiselect
                                        options={SelectPreferences?.preferences?.categories.map((data) => ({ key: data, value: data }))}
                                        selectedValues={SelectPreferences?.myPreferences?.categories
                                            ? SelectPreferences.myPreferences.categories.map((data) => ({ key: data, value: data }))
                                            : []}
                                        onSelect={(selectedList) => handleCategoryChange(selectedList.map((item) => item.key))}
                                        onRemove={(selectedList) => handleCategoryChange(selectedList.map((item) => item.key))}
                                        displayValue="value" closeOnSelect={false} showCheckbox={true}
                                    />
                                ) : (
                                    <p>No categories available.</p>
                                )}
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                            <h3>Authors</h3>
                            {
                                SelectPreferences.preferences && SelectPreferences.preferences.authors
                                    && SelectPreferences.preferences.authors.length > 0 ? (
                                    <Multiselect
                                        options={SelectPreferences?.preferences?.authors.map((author) => ({ key: author, value: author }))}
                                        selectedValues={SelectPreferences?.myPreferences?.authors
                                            ? SelectPreferences.myPreferences.authors.map((author) => ({ key: author, value: author }))
                                            : []}
                                        onSelect={(selectedList) => handleAuthorChange(selectedList.map((item) => item.key))}
                                        onRemove={(selectedList) => handleAuthorChange(selectedList.map((item) => item.key))}
                                        displayValue="value" closeOnSelect={false} showCheckbox={true}
                                    />
                                ) : (
                                    <p>No authors available.</p>
                                )}
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                            <h3>sources</h3>
                            {
                                SelectPreferences.preferences && SelectPreferences.preferences.sources
                                    && SelectPreferences.preferences.sources.length > 0 ? (
                                    <Multiselect
                                        options={SelectPreferences?.preferences?.sources.map((data) => ({ key: data, value: data }))}
                                        selectedValues={SelectPreferences?.myPreferences?.sources
                                            ? SelectPreferences.myPreferences.sources.map((data) => ({ key: data, value: data }))
                                            : []} onSelect={(selectedList) => handleSourceChange(selectedList.map((item) => item.key))}
                                        onRemove={(selectedList) => handleSourceChange(selectedList.map((item) => item.key))}
                                        displayValue="value" closeOnSelect={false} showCheckbox={true}
                                    />
                                ) : (
                                    <p>No sources available.</p>
                                )}
                        </div>

                    </div>
                    <br />
                    <div className='row'>
                        <button type="button" className="btn btn-secondary btn-lg" onClick={handleSavePreferences}>Save Preferences</button>
                    </div>

                </div>
            )}



        </>
    );
};

export default Preferences;
