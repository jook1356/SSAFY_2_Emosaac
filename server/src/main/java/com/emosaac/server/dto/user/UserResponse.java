package com.emosaac.server.dto.user;

import com.emosaac.server.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long userId;

    private String nickname;

    private String email;

    private String userName;

    private String imageUrl;



   public static UserResponse from(User user) {
        String imgUrl = user.getImageUrl();
        return new UserResponse(user.getUserId(), user.getNickName(), user.getEmail(), user.getUserName(), imgUrl);
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
