package com.emosaac.server.service.user;

import com.emosaac.server.domain.user.User;
import com.emosaac.server.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

//    public User getUser(String userId) {
//
//        return userRepository.findByUserId(userId);
//    }

    public User getUser(String userEmail) {

        return userRepository.findByUserEmail(userEmail);
    }

    public User getCurrentUser(Long userId) {
        return userRepository.findByMyId(userId);
    }

}
