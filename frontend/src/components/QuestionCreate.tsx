import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionCreate: React.FC = () => {
    const [subject, setSubject] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // eslint-disable-next-line no-unused-vars
        const apiBaseUrl = process.env.REACT_APP_API_URL || '';
        axios.post(`${apiBaseUrl}/api/question/create`, { subject, content }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(() => {
                navigate('/'); // Redirect to the list page on success
            })
            .catch(error => {
                console.error('Error creating question:', error);
                alert('질문 등록에 실패했습니다.');
            });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-primary">
                        <h2 className="card-title mb-0">새 질문 등록</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="subject" className="form-label">제목</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="subject"
                                    value={subject}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
                                    placeholder="질문 제목을 입력하세요."
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">내용</label>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    rows={10}
                                    value={content}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                                    placeholder="질문 내용을 입력하세요."
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">질문 등록</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionCreate;
