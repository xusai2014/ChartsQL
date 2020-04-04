import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const booksGql = gql`
  {
  books{
    title
  }
}
`;

 
export default  function(){
    const { loading, error, data ={books:[]} } = useQuery(booksGql);
    const { books = []} =data;

    return (<div>
        {
            books.map((v:any)=>{
            return <span>{v.title}</span>;
            })
        }
    </div>)
}