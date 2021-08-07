import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';


const SearchContainer = styled.form`
    display: flex;
    position: relative;
    justify-content: center;

    .search {
        width: 100%;
        display: block;
        padding: 10px 50px 10px 10px;
        position: relative;
        margin-bottom: 10px;
        border-radius: 5px;
        font-size: 16px;
        font-family: "Inter", sans-serif;
        color: ${({theme}) => theme.color};
        background: ${({theme}) => theme.background};
        border: 1px solid ${({theme}) => theme.borderColor};
        box-shadow: 0 5px 10px rgb(0 0 0 / 12%);

        &::placeholder {
            font-size: 14px;
        }
    }


    .search-btn {
        position: relative;

        button {
            position: absolute;
            left: -40px;
            top: 5px;
            background: transparent;
            border: none;
            cursor: pointer;

            i {
                font-size: 24px;
                font-style: normal;
            }
            i.x {
                font-size: 20px;
            }
        }
    }
`;
const Search = (props) => {
    const { t } = useTranslation();

    const getSearchResult = e => {
        e.preventDefault();
        props.setInput(e.target.value);
    }

    const clearInput = (e) => {
        e.preventDefault()
        props.setInput('')
        e.target.reset();
    }
    return (
        <SearchContainer onSubmit={e => clearInput(e) }>
            <input type="text" className="search" name={props.input} onChange={e => getSearchResult(e)} placeholder={t('dashboard.search.placeholder')} />
            <div className="search-btn">
                <button>{props.input ? <i className="x">&#10005;</i>:<i className="fab fa-sistrix"></i>}</button>
            </div>
        </SearchContainer>
    )
}

export default Search