package com.sastabackend.service;

import com.sastabackend.domain.Users;
import com.sastabackend.repository.UserRepository;
import com.sastabackend.service.exception.UserAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@Service
@Validated
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository repository;

    @Inject
    public UserServiceImpl(final UserRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public Users save(@NotNull @Valid final Users users) {
        LOGGER.debug("Creating {}", users);
        Users existing = repository.findOne(users.getId());
        if (existing != null) {
            throw new UserAlreadyExistsException(
                    String.format("There already exists a users with id=%s", users.getId()));
        }
        return repository.save(users);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Users> getList() {
        LOGGER.debug("Retrieving the list of all users");
        return repository.findAll();
    }

}
