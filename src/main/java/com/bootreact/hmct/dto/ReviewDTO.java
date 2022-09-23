package com.bootreact.hmct.dto;

import java.time.LocalDateTime;

import com.bootreact.hmct.entity.User;

import lombok.Data;

@Data
public class ReviewDTO {
	private int reviewNo;
	private String reviewTitle;
	private String reviewContent;
	private String reviewGrade;
	private LocalDateTime ReviewRegdate;
	
	
	private int productNo;
	private String userId;
	private String commonCode;
	
	
}
