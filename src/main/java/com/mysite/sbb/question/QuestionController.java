package com.mysite.sbb.question;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/question")
@RequiredArgsConstructor
@RestController
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping("/list")
    public List<Question> list() {
        return this.questionService.getList();
    }

    @GetMapping("/detail/{id}")
    public Question detail(@PathVariable("id") Integer id) {
        return this.questionService.getQuestion(id);
    }

    @PostMapping("/create")
    public Question create(@RequestBody QuestionForm questionForm) {
        return this.questionService.create(questionForm.getSubject(), questionForm.getContent());
    }
}
