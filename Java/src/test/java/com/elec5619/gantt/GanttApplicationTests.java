package com.elec5619.gantt;

import com.elec5619.gantt.DTO.loginDTO;
import com.elec5619.gantt.DTO.registerDTO;
import com.elec5619.gantt.DTO.ganttDTO;
import com.elec5619.gantt.DTO.taskDTO;
import com.elec5619.gantt.tables.credentials.CredentialsRepository;
import com.elec5619.gantt.tables.ganttChart.GanttChartRepository;
import com.elec5619.gantt.tables.task.TaskRepository;
import com.elec5619.gantt.tables.user.UserRepository;
import com.google.api.client.util.DateTime;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class GanttApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	ObjectMapper objectMapper;
	@Test
	public void testSignUpHandler() throws Exception {
		registerDTO registrationData = new registerDTO("Joe", "joe@gmail.com", "12kdn34gcvnd");
		String jsonData = objectMapper.writeValueAsString(registrationData);
		mockMvc.perform(MockMvcRequestBuilders.post("/api/endpoint")
						.contentType(MediaType.APPLICATION_JSON)
						.content(jsonData))
				.andExpect(MockMvcResultMatchers.status().isOk());

	}

	@Test
	public void testLoginDTO() throws Exception {
		loginDTO test = new loginDTO("al@asdw.com", "12gdks");
		assertEquals("al@asdw.com", test.getEmail());

	}

	@Test
	public void testRegisterDTO() throws Exception {
		registerDTO test = new registerDTO("Joe Schmoe", "joe@test.com", "aszxqwe");
		assertEquals("Joe Schmoe", test.getName());
	}

	@Test
	public void testGanttDTO() {
		ganttDTO test = new ganttDTO(1, "new chart", "its a new chart", "normal task");
		assertEquals(1, test.getUserId());
	}

	@Test
	public void testTaskDTO() {
		taskDTO test = new taskDTO(1, 1, "example task", "normal task",
				"its a normal task", 0, "2023-10-02T13:00:00.000Z", "2023-10-06T13:00:00.000Z");

		assertEquals(test.getDescription(), "its a normal task");

	}

	@Test
	public void testTaskDTODateTime() {
		taskDTO test = new taskDTO(1, 1, "example task", "normal task",
				"its a normal task", 0, "2023-10-02T13:00:00.000Z", "2023-10-06T13:00:00.000Z");

		DateTime testDateTime = new DateTime("2023-10-02T13:00:00.000Z");
		assertEquals(test.getStart(), testDateTime);

	}



}
