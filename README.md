# Basic Ecommerce App
 Ecommerce App created using node.js , HTML, CSS

Steps:
1.  Create an app folder
2.  run npm init
3.  install dependecies nodemon and express
4.  Add dev command to package.json (to enable : node run dev)
5.  start working on index.js and create web server. (app and router setup in index.js file)
6.  ref express documentation to start a web server. 
7.  Optional : use express generator to generate app skeleton.
8.  Manually create skeleton of the project. Basic structure will require a route, a view, and a repository folder.
        Routes containing the routing info when visiting from one page to another.
        View contains HTML and CSS.
        Repository contains db related files.
9.  Create a routes/admin/auth.js file and write the route handlers for admin in this file.
10. Create a SubRouter (like done in index.js) in the auth.js file 
        and use router.get instead of app.get. (where router = express.Router()). Export that with "module.exports = router" at the end.
11. Reference that router in the index.js file. And insert it as app.use(router) middleware. 
12. Create template files: /views/admin/sigin.js & /views/admin/sigup.js. 
        Write an module.exports function and return a template string.
13. Add the reference of the files created in 11th step in the router/admin/auth.js file.
14. Include the template reference(s) in res.send function in the routes.
15. Create a layout.js file in views folder.
16. export a function that returns a template string containing html skeleton and accepts content to display.
17. Modify the templates to include layout function and the existing html should be included as content to layout function.
18. To understand above couple of steps, here is the flow : 
        a. In route auth.js file siginTemplate should be called(in res.send). Then in signInTemplate view, layout should be called and passed,
           with signIn specific template string as content.
        b. so when layout renders it will include content of signIn.
        c. do the same for signUp and rest.
19. Now focus on making signin and signup work.
20. Get the form data from signUp and signIn forms and print on console. 
        (hint: use req.on(). Its a request object event listener and data event)
21. Use bodyparser library to parse/convert the bindary data coming form to string.
22. Create users.js file to store user info.
23. Write userRepository class with a constructor. Call the class in same file to create an instance of the class.
        (constructor is invoked when new instance of class is created. i.e when first time user repo is created.)
24. Now use fs library of nodejs to create a new file. (check for duplicates. fs.accessSync and fs.writeSync )
25. Now running this user.js file will create a new repository file user.json. 
        Now create the functions that will add/edit/delete/get data from/to user.json file.
26. Use the promise based version of the fs library to read/edit contents of files as it is easier to handle.
        User promises wherever possible.
27. Now create getAll (to get data) function.
        a. open and read all contents of the file.
        b. parse the content to JSON
        c. return the parsed content
28. Write a create() function to create a record in users.json file.
        get all records. Add new record. write all the records back to file.
29. Seperate writeAll function logic from create. as writeAll function will be used frquently.
30. Create a randomId generator to generate id or unique identifier for records in user.json.
        use crypto module for genrating random string of chars.
31. Now create function getOne to retrieve record for a particular ID.
        use Array.find method.
32. Delete function. Create a delete function similar to that of getOne.
        fetch all records. Find one record. delete that record. writeAll back to file.
33. Update function is little more complex. Find record by the id first, then to update/add details to record,
        use Object.assign function of Javascript. (check MDN)
34. GetOneBy method. (find a record with filters)
        iterate through all idexes of array of objects. (for of loop (in array))
        iterate through all key value pair of the filters object. (for in loop(in object))
        match the value of database records with the filters object values.
35. Set the export line and instatiate the class. instead of exporting the entire class, export an instance of the class.
        We can do this because in our case we only need one instance of our users.json file/db.
36. Handle the signup functional.
        1. email should be unique.
        2. password and password confirmation should be same.
        3. Create an account if all passes.
37. Use cookies to manage session and provide authentication. Use cookie-session library
