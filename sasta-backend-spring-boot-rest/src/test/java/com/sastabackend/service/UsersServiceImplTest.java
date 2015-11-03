package com.sastabackend.service;

import com.sastabackend.service.exception.UserAlreadyExistsException;
import com.sastabackend.domain.Users;
import com.sastabackend.repository.UserRepository;
import com.sastabackend.util.UserUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Collection;

import static org.junit.Assert.*;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
/*
@RunWith(MockitoJUnitRunner.class)
public class UsersServiceImplTest {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    @Before
    public void setUp() throws Exception {
        userService = new UserServiceImpl(userRepository);
    }

    @Test
    public void shouldSaveNewUser_GivenThereDoesNotExistOneWithTheSameId_ThenTheSavedUserShouldBeReturned() throws Exception {
        final Users savedUsers = stubRepositoryToReturnUserOnSave();
        final Users users = UserUtil.createUser();
        final Users returnedUsers = userService.save(users);
        // verify repository was called with users
        verify(userRepository, times(1)).save(users);
        assertEquals("Returned users should come from the repository", savedUsers, returnedUsers);
    }

    private Users stubRepositoryToReturnUserOnSave() {
        Users users = UserUtil.createUser();
        when(userRepository.save(any(Users.class))).thenReturn(users);
        return users;
    }

    @Test
    public void shouldSaveNewUser_GivenThereExistsOneWithTheSameId_ThenTheExceptionShouldBeThrown() throws Exception {
        stubRepositoryToReturnExistingUser();
        try {
            userService.save(UserUtil.createUser());
            fail("Expected exception");
        } catch (UserAlreadyExistsException ignored) {
        }
        verify(userRepository, never()).save(any(Users.class));
    }

    private void stubRepositoryToReturnExistingUser() {
        final Users users = UserUtil.createUser();
        when(userRepository.findOne(users.getId())).thenReturn(users);
    }

    @Test
    public void shouldListAllUsers_GivenThereExistSome_ThenTheCollectionShouldBeReturned() throws Exception {
        stubRepositoryToReturnExistingUsers(10);
        Collection<Users> list = userService.getList();
        assertNotNull(list);
        assertEquals(10, list.size());
        verify(userRepository, times(1)).findAll();
    }

    private void stubRepositoryToReturnExistingUsers(int howMany) {
        when(userRepository.findAll()).thenReturn(UserUtil.createUserList(howMany));
    }

    @Test
    public void shouldListAllUsers_GivenThereNoneExist_ThenTheEmptyCollectionShouldBeReturned() throws Exception {
        stubRepositoryToReturnExistingUsers(0);
        Collection<Users> list = userService.getList();
        assertNotNull(list);
        assertTrue(list.isEmpty());
        verify(userRepository, times(1)).findAll();
    }

}*/
