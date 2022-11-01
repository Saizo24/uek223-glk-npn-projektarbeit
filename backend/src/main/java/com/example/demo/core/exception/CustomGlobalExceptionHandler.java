package com.example.demo.core.exception;

import java.time.LocalDate;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomGlobalExceptionHandler {

  //May be used for further ExceptionHandlers
  //messageSource.getMessage("errors.exception.message", null, LocaleContextHolder.getLocale())
  private MessageSource messageSource;

  @Autowired
  public CustomGlobalExceptionHandler(MessageSource messageSource) {
    this.messageSource = messageSource;
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  public ResponseError handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpServletRequest request) {
    return new ResponseError().setTimeStamp(LocalDate.now())
                              .setErrors(ex.getBindingResult()
                                           .getFieldErrors()
                                           .stream()
                                           .collect(Collectors.toMap(FieldError::getField,
                                               DefaultMessageSourceResolvable::getDefaultMessage)))
                              .build();
  }

}


