package com.elec5619.gantt.services;

import java.util.Optional;

import com.elec5619.gantt.DTO.loginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elec5619.gantt.DTO.registerDTO;
import com.elec5619.gantt.tables.credentials.Credentials;
import com.elec5619.gantt.tables.credentials.CredentialsRepository;
import com.elec5619.gantt.tables.user.User;
import com.elec5619.gantt.tables.user.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CredentialsRepository credentialsRepository;

    public AuthService() {
    }

    public void signUpHandler(registerDTO newUserDetails) {

        User newUser = new User(newUserDetails.getName(), newUserDetails.getEmail());
        Credentials newCredentials = new Credentials(newUserDetails.getPassword());

        credentialsRepository.save(newCredentials);
        newUser.setCredential(newCredentials);
        userRepository.save(newUser);
    }

    public User loginHandler(loginDTO loginDetails) {
        User found = userRepository.findByEmail(loginDetails.getEmail());
        Optional<Credentials> user_found_credentials = credentialsRepository.findById(found.getCredential().getId());
        if (user_found_credentials.get().getPassword().equals(loginDetails.getPassword())) {
            return found;
        }

        return null;
    }

    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void removeUserById(Integer id) {
        Optional<User> intermediate_target = userRepository.findById(id);
        User target = intermediate_target.get();
        userRepository.delete(target);

    }

    public User getSpecificUser(loginDTO loginDetails) {
        return userRepository.findByEmail(loginDetails.getEmail());
    }

}
