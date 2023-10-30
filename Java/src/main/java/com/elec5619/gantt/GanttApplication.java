package com.elec5619.gantt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GanttApplication {

	@Autowired
	public static void main(String[] args) {
		SpringApplication.run(GanttApplication.class, args);
	}

}
