import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 160px;

  @media(max-width: 769px){
    width: 100%;
    margin-top: 110px;
  }
`;

const Form = styled.form`
  position: relative;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    width: 85%;
    margin-bottom: 10px;
  }
`;


const ReviewTextArea = styled.textarea`
  width: 660px; /* 너비 조절 */
  height: 60px; /* 높이 조절 */
  resize: none;
  padding: 15px; /* 여백 추가 */
  font-size: 16px; /* 폰트 크기 조절 */
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const SubmitButton = styled.button` 
  border: none;
  outline: none;
  font-size: 18px;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 60px;
  border-radius: 5px;
  background-color: #e30914;
  color: white;
  padding: 14px 30px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  &:hover {
    background-color: #b9070d; /* 호버 시 배경색 변화 */
  }
`;

const EditButton = styled.button`
  color: white;
  padding: 10px 20px;
  margin-left: 20px;
  border-radius: 5px;
  font-size: 16px;
  right: 0;
  background-color: #e30914
`;

const ReviewText = styled.li`
  color: white; /* 텍스트 색상을 하얀색으로 변경 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 20px;
`;

const DeleteButton = styled.button`
  color: white;
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 16px;
  border-radius: 5px;
  right: 0;
  background-color: #e30914
`;

const ButtonGroup = styled.div`
  display: flex; // 버튼을 가로로 배열
`;

const MovieDetail = () => {
  const {id} = useParams();
  const [review, setReview] = useState(''); // 후기 상태
  const [reviews, setReviews] = useState(JSON.parse(localStorage.getItem('reviews_' + id)) || []);
  const [editIndex, setEditIndex] = useState(-1);
  const reviewRef = useRef(null);
  

  const handleReviewChange = (e) => {
    setReview(e.target.value); // 입력된 후기 업데이트
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedReviews = [...reviews];
    if (review.trim() !== '') {
      if(editIndex > -1){
        updatedReviews[editIndex] = review;
        setEditIndex(-1);
      } else{
        updatedReviews = [...updatedReviews, review];
      }
      setReview(''); // 후기 입력란 초기화
      setReviews(updatedReviews);
      localStorage.setItem('reviews_' + id, JSON.stringify(updatedReviews));
    } reviewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleEdit = (index) => {
    setEditIndex(index); // 수정 모드로 변경
    setReview(reviews[index]); // 수정할 내용을 입력창에 표시
  };

  const handleDelete = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    localStorage.setItem('reviews_' + id, JSON.stringify(updatedReviews));
  };
  

  return (
    <div>
      <FormContainer>
          <Form onSubmit={handleSubmit}>
            <ReviewTextArea value={review} onChange={handleReviewChange} placeholder='후기를 작성해주세요' ref={reviewRef}/>
          <SubmitButton type="submit">{editIndex > -1 ? '수정' : '작성 완료'}</SubmitButton>
        </Form>
        <div>
          <h2>후기 목록</h2>
          {reviews.length > 0 ? (
          <ul>
            {reviews.map((r, index) => (
              <ReviewText key={index}>
                <span>{r}</span>
                <ButtonGroup>
                  <EditButton onClick={() => handleEdit(index)}>수정</EditButton>
                  <DeleteButton onClick={()=>handleDelete(index)}>삭제</DeleteButton>
                </ButtonGroup>
                
              </ReviewText>
            ))}
          </ul>
        ) : (
          <p>후기가 없습니다.</p>
        )}
        </div>
      </FormContainer>
    </div>
  );
};

export default MovieDetail;
