package com.sastabackend.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
/*
@RunWith(MockitoJUnitRunner.class)
public class UsersControllerTest {

    @Mock
    private UserService userService;

    private UserController userController;

    @Before
    public void setUp() throws Exception {
        userController = new UserController(userService);
    }

    @Test
    public void shouldCreateUser() throws Exception {
        final Users savedUsers = stubServiceToReturnStoredUser();
        final Users users = UserUtil.createUser();
        Users returnedUsers = userController.createUser(users);
        // verify users was passed to UserService
        verify(userService, times(1)).save(users);
        assertEquals("Returned users should come from the service", savedUsers, returnedUsers);
    }

    private Users stubServiceToReturnStoredUser() {
        final Users users = UserUtil.createUser();
        when(userService.save(any(Users.class))).thenReturn(users);
        return users;
    }


    @Test
    public void shouldListAllUsers() throws Exception {
        stubServiceToReturnExistingUsers(10);
        Collection<Users> userses = userController.listUsers();
        assertNotNull(userses);
        assertEquals(10, userses.size());
        // verify user was passed to UserService
        verify(userService, times(1)).getList();
    }

    private void stubServiceToReturnExistingUsers(int howMany) {
        when(userService.getList()).thenReturn(UserUtil.createUserList(howMany));
    }

}
*/