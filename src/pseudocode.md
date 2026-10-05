# JobTrack — Pseudocode

## 1. Application Authentication

### Registration

```text
START

Display registration form

User enters username
User enters password

IF username or password is empty
    Display validation message
ELSE
    Save username to local storage
    Save password to local storage
    Display registration success message
    Navigate user to Login page
END IF

END


### Login

text
START

Display login form

User enters username
User enters password

IF username or password is empty
    Display validation message
ELSE
    Get registered username from local storage
    Get registered password from local storage

    IF entered username matches registered username
       AND entered password matches registered password
        Set authentication status to true
        Navigate user to Home page
    ELSE
        Display incorrect username or password message
    END IF
END IF

END


### Forgot Password

text
START

User selects "Forgot Password"

Get registered username from local storage

IF no registered account exists
    Display account not found message
ELSE
    Ask user to enter username

    IF username does not match registered username
        Display username not found message
    ELSE
        Ask user to enter a new password

        IF password is less than 6 characters
            Display password validation message
        ELSE
            Save new password to local storage
            Display password reset success message
        END IF
    END IF
END IF

END


---

# 2. Protected Routes

text
START

User attempts to access a protected page

Check authentication status in local storage

IF user is authenticated
    Allow user to access the requested page
ELSE
    Redirect user to Login page
END IF

END


Protected pages include:

text
Home
Add Job
Job Details
Edit Job


---

# 3. Display Job Applications

text
START

Open Home page

Set loading state to true

Request job data from JSON Server

IF request is successful
    Store jobs in application state
    Display job applications
ELSE
    Display an error message
END IF

Set loading state to false

END


---

# 4. Add Job Application

text
START

User opens Add Job page

Display job application form

User enters:
    Company name
    Job role
    Application status
    Date applied
    Job duties

User submits form

IF any required field is empty
    Display validation message
    Stop submission
ELSE
    Create new job object

    Send POST request to JSON Server

    IF request is successful
        Display success message
        Navigate to Home page
    ELSE
        Display error message
    END IF
END IF

END


---

# 5. View Job Details

text
START

User selects a job application

Get job ID from URL parameter

Send request to JSON Server using the job ID

IF job is found
    Store job details
    Display:
        Company name
        Job role
        Status
        Date applied
        Job duties
        Edit button
        Delete button
ELSE
    Display "Job Not Found"
END IF

END


---

# 6. Edit Job Application

text
START

User selects Edit Job

Get job ID from URL parameter

Request existing job information from JSON Server

Display existing job information in the form

User changes the required information

User submits form

IF any required field is empty
    Display validation message
ELSE
    Create updated job object

    Send PUT request to JSON Server

    IF request is successful
        Display success message
        Navigate to Job Details page
    ELSE
        Display error message
    END IF
END IF

END


---

# 7. Delete Job Application

text
START

User selects Delete Job

Display confirmation message

IF user selects Cancel
    Keep the job application
ELSE IF user confirms deletion
    Send DELETE request to JSON Server

    IF request is successful
        Display success message
        Navigate to Home page
    ELSE
        Display error message
    END IF
END IF

END


---

# 8. Search Jobs

text
START

User enters a search term

Get search value from URL query parameter

Compare search term with:
    Company name
    Job role

IF company name or job role contains search term
    Display matching jobs
ELSE
    Display no matching applications message
END IF

Update URL with the search query

END


Example:

text
/home?search=Capitec


---

# 9. Filter Jobs by Status

text
START

User selects a status

Get selected status from URL query parameter

IF status is "All"
    Display all jobs
ELSE
    Display jobs matching the selected status
END IF

Update URL with selected status

END


Possible statuses:

text
Applied
Interviewed
Rejected


Example:

text
/home?status=Interviewed


---

# 10. Sort Jobs by Application Date

text
START

User selects sorting option

Get sorting value from URL query parameter

IF sorting option is ascending
    Sort jobs from oldest application date to newest
ELSE
    Sort jobs from newest application date to oldest
END IF

Update URL with sorting option

END


Examples:

text
/home?sort=asc
/home?sort=desc


---

# 11. Combining Search, Filter and Sort

text
START

Get jobs from JSON Server

Get search query from URL
Get status filter from URL
Get sort option from URL

IF search query exists
    Filter jobs by company name or role
END IF

IF status filter exists
    Filter jobs by selected status
END IF

IF sort option is selected
    Sort the filtered jobs by application date
END IF

Display the final list of jobs

END


---

# 12. Logout

text
START

User selects Logout

Display confirmation message

IF user cancels
    Keep user logged in
ELSE
    Remove authentication status from local storage
    Redirect user to Login page
END IF

END


---

# 13. 404 Page

text
START

User enters a URL that does not match any application route

React Router checks available routes

IF no matching route is found
    Display 404 Not Found page
    Provide option to return to Home
END IF

END


---

# 14. Overall Application Flow

text
START

Display Landing page

User chooses Register or Login

IF user chooses Register
    Register account
    Navigate to Login
END IF

IF user chooses Login
    Verify credentials

    IF credentials are correct
        Allow access to protected pages
    ELSE
        Display login error
    END IF
END IF

User enters Home page

User can:
    Search applications
    Filter applications
    Sort applications
    Add application
    View application
    Edit application
    Delete application
    Logout

All job data is stored using JSON Server.

IF user logs out
    Redirect to Login

IF user enters an invalid URL
    Display 404 page

END

