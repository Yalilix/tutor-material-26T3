# Tutorial 2

[TOC]

## A. Style

### 1. Basic style
While we haven't given you a style guide yet, it's still important to maintain
good style! Most styling rules taught in 1511 still apply.

Take a look at [style.js](style.js). It contains many style issues. You will
have 5 minutes to review the code in your groups and identify as many style
issues as you can!

> <details close>
> <summary> Click to view SOLUTION! </summary>
>
> - More descriptive variable names (instead of x y z, use sum, average and user)
> - Consistent and proper spacing
> - Consistent indentation (we use 2-space indentation in 1531)
> - Use a for-of loop instead of c-style and for-in loops
> - `const` instead of `let`
>
>
> ```js
> // Is there someone taller than 190cm? What about 195cm?
> let flag = 1;
> for (const user of userData) {
>   if (user.height > 190) {
>     console.log(true);
>     flag = 0;
>   }
> }
> if (flag) {
>   console.log(false);
> }
>
> // What is Jason's age?
> let jason;
> for (user of userData) {
>   if (user.name === 'Jason') {
>     jason = user;
>   }
> }
> console.log(`Jasons age is: ${jason.age}`)
>
> // What's the average height of all users?
> let sum = 0;
> for (user of userData) {
>   sum += user.height;
> }
> let average = sum / userData.length;
> console.log(average);
> ```
> </details>

### 2. Javascript style / Array Methods

JavaScript is a high-level language with many built-in features that simplify
common tasks. This built-in functionality makes it easier to read, write and
debug code.

Today, we’ll focus on array methods. These are like functions specifically
designed for performing common operations on arrays, such as adding elements,
finding items, sorting, and more.

Let's try to rewrite the code in a more "javascripty" way by using array
methods. Search online for some array methods you could use to perform the
following tasks:

- Finding if there exists a user taller than 190
- Finding the age of a user given their name
- Finding the average height of all the users
- Add a user to the array
- Remove a user from the array
- Make a copy of the array

> <details close>
> <summary> Click to view SOLUTION! </summary>
>
> ```js
> /////////////////////////////////// PART 1 ///////////////////////////////////
>
> // Is there someone taller than 190cm? What about 195cm?
> console.log(userData.some(user => user.height > 190))
>
> // What is Jason's age?
> const age = userData.find(user => user.name === 'Jason').age
> console.log(`Jasons age is: ${age}`)
>
> // What's the average height of all users?
> console.log(userData.reduce((a, b) => a + b.height, 0) / userData.length)
>
> /////////////////////////////////// PART 2 ///////////////////////////////////
>
> // how do we add a user called Jarrod, aged 19 and with a height of 162?
> userData.push({
>   name: 'Jarrod',
>   age: 19,
>   height: 162,
> })
>
> // how do we remove Jason from the array?
> userData = userData.filter(person => person.name != 'Jason');
>
> // make a copy of the array?
> let userDataCopy = structuredClone(userData);
> ```
> </details>

## B. Git for Teamwork

> 20 minutes

### Branching
To ensure our repository always contains a stable, bug-free version of our code,
we need a way to manage incomplete or experimental code. Enter branches!

Branches allow multiple people to collaborate on the same repository at the same
time without affecting the master branch or interfering with each other's work.

Let's see all the branches we have in our repo by running
```sh
$ git branch (lists all branches in your local repo)
$ git branch -r (lists all branches in your remote repo)
$ git branch -a (lists all branches in your local and remote repo)
```
> <details close>
> <summary> Click to view example</summary>
>
> ![git-branch-options](/tut02/assets/git-branch-options.png)
> </details>

You should see the `master` branch listed and in green or highlighted. This
tells us that we have 1 branch in our repo and we're currently on it.

We want to keep the `master` branch stable, so let's create another branch to
work on.
```sh
$ git branch alex-branch
```
now let's check our branches
```sh
$ git branch
```
You'll see `alex-branch` added to the list of branches, but the master branch
will still be green.

> <details close>
> <summary> Click to view example</summary>
>
> ![git-branch-create](/tut02/assets/git-branch-create.png)
> </details>

To switch to the branch we just created, we need to use
```sh
$ git checkout alex-branch
```

> <details close>
> <summary> Click to view example</summary>
>
> ![git-checkout-branch](/tut02/assets/git-checkout-branch.png)
> </details>

Now we can start modifying code. Make some changes to a file, add, commit and then push.

When pushing for the first time, you may be prompted with
```sh
$ git push --set-upstream origin alex-branch
```
This command specifies where we push our code to. Once executed, it will create
a new branch on the remote repo with the same name and "link" the two branches
together. Subsequent pushes from our local branch will be sent to this newly
created branch on the remote repository.

> <details close>
> <summary> Click to view example</summary>
>
> ![git-push-set-upstream](/tut02/assets/git-push-set-upstream.png)
> </details>
</br>

Note: a new branch can also be made by running
```sh
$ git checkout -b <branch name>
```
These commands are a combination of `git branch` and `git checkout` as it makes
a new branch and switches to it.

> <details close>
> <summary> Click to view example</summary>
>
> ![git-checkout-create-switch](/tut02/assets/git-checkout-create-switch.png)
> </details>

### Making a merge request
After pushing, we notice that the changes we made aren't reflected in the master
branch. To integrate the changes from our branch into the master branch, we can
use merge requests.

You may see something like this after pushing. Clicking the link will take you
to gitlab where you can create a merge request to master.
```
remote: To create a merge request for alex-branch, visit:
remote: <link here>
```

Alternatively, you can create a merge request via the GitLab interface i.e. the
"Merge Requests" tab in the sidebar of the repository.
> <details close>
> <summary> Click to view example</summary>
>
> 1. Go to "Merge Requests" in the side bar.</br>
>   ![gitlab-sidebar-mr](/tut02/assets/gitlab-sidebar-mr.png)
>
> 1. Select the branch you want to merge.<br/>
>   ![gitlab-create-mr](/tut02/assets/gitlab-create-mr.png)
>
> 1. Fill out the form and create.<br/>
>   ![gitlab-create-mr-form](/tut02/assets/gitlab-create-mr-form.png)
> </details>
<br/>

**!! For your project, you will need someone else to review your code and
approve it before you can merge it into master !!**

Why is it important to create merge requests instead of pushing directly into
master when you're done?

> It allows your teammates to review your code, provide feedback, and suggest
> improvements before it gets merged into the master branch.

### Handling merge conflicts
While Git is great at merging code changes automatically, it can struggle
sometimes, especially when two people modify the same part of code
simultaneously. In such cases, Git can’t determine how to merge the changes,
resulting in a merge conflict. Learning how to resolve merge conflicts properly
is important!

Firstly, let's create a merge conflict.
1. On `alex-branch`, edit an existing file and add some code to line 1. Save the
   changes, then add, commit, and push them.
   > <details close>
   > <summary> Click to view example</summary>
   >
   > ![merge-conflict-alex-branch-edit](/tut02/assets/merge-conflict-alex-branch-edit.png)
   > </details>

2. From the master branch, create a new branch called `bob-branch` and checkout
   to it.
   > <details close>
   > <summary> Click to view example</summary>
   >
   > ![merge-conflict-create-bob-branch](/tut02/assets/merge-conflict-create-bob-branch.png)
   > </details>

3. On `bob-branch`, edit the **same file** and add some lines of code to line 1
   > <details close>
   > <summary> Click to view example</summary>
   >
   > ![merge-conflict-bob-branch-edit](/tut02/assets/merge-conflict-bob-branch-edit.png)
   > </details>

4. Save the changes, then add, commit, and push them.
5. Create merge requests from both `alex-branch` and `bob-branch` into the
   master branch.
   > <details close>
   > <summary> Click to view example</summary>
   >
   > ![merge-conflict-mrs-alex-bob](/tut02/assets/merge-conflict-mrs-alex-bob.png)
   > </details>

6. Accept the merge request from `alex-branch`.
7. Check `bob-branch`. The merge request from `bob-branch` should now show a
   merge conflict.
   > <details close>
   > <summary> Click to view example</summary>
   >
   > ![merge-conflict-alex-branch-edit](/tut02/assets/merge-conflict-mrs-alex-merged-bob-conflict.png)
   > </details>

How do we resolve this merge conflict?

> <details close>
> <summary> Click to view solution.</summary>
>
> To resolve a merge conflict, let's recreate the conflict locally, resolve the
> conflicting file/s, and push up changes that will not conflict.
>
> 1. Checkout to `bob-branch` and pull from the remote `master` branch, i.e. the
>    branch `bob-branch` is in conflict with, using:
>    ```sh
>    $ git pull origin master
>    ```
>    This should cause a local conflict.
>
>    ![merge-conflict-recreate-conflict-locally-on-bob-branch](/tut02/assets/merge-conflict-recreate-conflict-locally-on-bob-branch.png)
>
> 2. Resolve the merge conflict by combining code how you like, then commit
>    changes before pushing.
>
>     Conflicts are shown with "markers" that git adds during the merge. These
>     indicate the differences between the conflicting commits, which require a
>     human to manually resolve. There can be multiple conflicts in one file.
>
>     ![merge-conflict-markers](/tut02/assets/merge-conflict-markers.png)
>
>     Your editor may also help highlight conflicts and give you shortcuts to
>     resolving them. For example, VSCode presents conflicts like so:
>
>     ![merge-conflict-markers-vscode](/tut02/assets/merge-conflict-markers-editor.png)
>
>     In this case, let's resolve the conflict by combining both changes. Don't
>     forget to remove the conflict markers `<<< === >>>`!
>
>    ![merge-conflict-resolved-editor](/tut02/assets/merge-conflict-resolved-editor.png)
>
>     Then add and commit the fixed file. This indicates to git the conflict is
>     resolved.
>
>     ![merge-conflict-resolved-add-commit-push](/tut02/assets/merge-conflict-resolved-add-commit.png)
>
> 3. Finally, we can git push, and our merge request should no longer conflict.
>
>     ![merge-conflict-resolved-mr-ready](/tut02/assets/merge-conflict-resolved-mr-ready.png)
> </details>