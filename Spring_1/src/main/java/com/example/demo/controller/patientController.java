package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.InterviewForm;
import com.example.demo.Entity.JwtRequest;
import com.example.demo.Entity.JwtResponse;
import com.example.demo.Entity.Patient;
import com.example.demo.repository.InterviewRepository;
import com.example.demo.repository.PatientRepository;
import com.example.demo.service.InterviewServices;
import com.example.demo.service.JwtService;
import com.example.demo.service.PatientService;

import ch.qos.logback.classic.net.SyslogAppender;

@RestController
@RequestMapping("patient/")
@CrossOrigin(origins = "*")
public class patientController {
	@Autowired
	PatientRepository repo;
	@Autowired
	JwtService jwtService;
	@Autowired
	PatientService patientService;
	@Autowired
	InterviewServices interviewService;
	@Autowired private PasswordEncoder passwordEncoder;
	
	
	@GetMapping("doget")
	public List<Patient> getPatients(@RequestHeader("Secret") String secret){
	
		if(secret.equals("LAVISH")) {
			
		   	return this.repo.findAll();
		}
		return null;
	}
	@PostMapping("interviewForm/{email}")
	public InterviewForm registerInterviewForm(@RequestBody InterviewForm iForm,@PathVariable String email) {
		iForm.setEmail(email);
		return interviewService.registerForm(iForm);
	}
	@PutMapping("updatePass/{newPass}")
	public Boolean updatePassword(@RequestBody Patient pR,@PathVariable String newPass)throws Exception {
		String NewPass=passwordEncoder.encode(newPass);
		String email=pR.getEmail();
		String pass=pR.getPassword();
		String encodePass=repo.findByPassword(email);
		Optional<Patient > pR1=repo.findByEmailid(email);
		if (!pR1.isPresent()) {
			throw new Exception("This User is Invalid");
		}
		else {
		if (passwordEncoder.matches(pass, encodePass)) {
		pR.setId(pR1.get().getId());
		pR.setPassword(NewPass);
		repo.save(pR);
		return true;
		}else {
			return false;
		}
		
		}
		
		
	
	}
	@GetMapping("get")
	public List<Patient> getPatients1(){
		return this.repo.findAll();
	}
	@GetMapping("getByEmail/{email}")
	public Patient getPatient(@PathVariable String email) {
		return patientService.getByEmail(email);
	}
	@PostMapping("register")
	public Patient persist(@RequestBody final Patient p){
		
		return patientService.registerNewPatient(p);
	}
	@PostMapping("auth")
	public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest) {
		try {
		
			JwtResponse jwtResponse = jwtService.createJwtToken(jwtRequest);
			String t=jwtResponse.getJwtToken();
			String t1="Token is - "+t;
			System.out.println(t1);
			return jwtResponse;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		
	}
	@PutMapping("update")
	public Patient Update(@RequestBody  Patient pR )throws Exception {
		String email=pR.getEmail();
		Optional<Patient > pR1=repo.findByEmailid(email);
		if (!pR1.isPresent()) {
			throw new Exception("This User is Invalid");
		}
		else {
		pR.setId(pR1.get().getId());
		repo.save(pR);
		}
		
		return pR;
		
	}
	
            
	
}
