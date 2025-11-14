import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Answer {
    id: number;
    content: string;
}

interface Question {
    id: number;
    subject: string;
    content: string;
    answerList: Answer[];
}

const QuestionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [question, setQuestion] = useState<Question | null>(null);
    const [content, setContent] = useState<string>('');
    const apiBaseUrl = process.env.REACT_APP_API_URL || '';

    const fetchQuestion = useCallback(() => {
        axios.get<Question>(`${apiBaseUrl}/api/question/detail/${id}`)
            .then(response => {
                setQuestion(response.data);
            })
            .catch(error => {
                console.error('Error fetching question details:', error);
            });
    }, [id, apiBaseUrl]);

    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion]);

    const handleAnswerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post(`${apiBaseUrl}/api/answer/create/${id}`, { content })
            .then(() => {
                setContent('');
                fetchQuestion(); // Re-fetch question to see the new answer
            })
            .catch(error => {
                console.error('Error submitting answer:', error);
            });
    };

    if (!question) {
        return <div className="text-center my-5">Loading question details...</div>;
    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-primary">
                        <h2 className="card-title mb-0">{question.subject}</h2>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{question.content}</p>
                    </div>
                </div>

                <h3 className="mb-3">Answers ({question.answerList.length})</h3>
                {question.answerList.length > 0 ? (
                    <div className="list-group mb-4">
                        {question.answerList.map(answer => (
                            <div key={answer.id} className="list-group-item list-group-item-action flex-column align-items-start">
                                <p className="mb-1">{answer.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info mb-4" role="alert">
                        아직 답변이 없습니다.
                    </div>
                )}

                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-light">
                        <h4 className="mb-0">답변 작성</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleAnswerSubmit}>
                            <div className="mb-3">
                                <label htmlFor="answerContent" className="form-label visually-hidden">답변 내용</label>
                                <textarea
                                    id="answerContent"
                                    rows={5}
                                    className="form-control"
                                    value={content}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                                    placeholder="답변을 입력하세요."
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-success w-100">답변 등록</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;