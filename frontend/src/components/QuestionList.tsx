import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Question {
    id: number;
    subject: string;
}

const QuestionList: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const apiBaseUrl = process.env.REACT_APP_API_URL || '';
        axios.get<Question[]>(`${apiBaseUrl}/api/question/list`)
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the questions!', error);
            });
    }, []);

    return (
        <div>
            <h1 className="mb-4">Questions</h1>
            <div className="d-flex justify-content-end mb-4">
                <Link to="/question/create" className="btn btn-primary">
                    질문 등록하기
                </Link>
            </div>
            <div className="row">
                {questions.length > 0 ? (
                    questions.map(question => (
                        <div key={question.id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to={`/question/${question.id}`} className="text-decoration-none text-dark">
                                            {question.subject}
                                        </Link>
                                    </h5>
                                </div>
                                <div className="card-footer bg-transparent border-top-0">
                                    <Link to={`/question/${question.id}`} className="btn btn-sm btn-outline-primary">
                                        자세히 보기
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="alert alert-info" role="alert">
                            등록된 질문이 없습니다.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionList;