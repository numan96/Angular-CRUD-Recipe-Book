# Angular Recipe Book
This website was created with Angular 11, TypeScript, NgRx, Firebase, CSS and Bootstrap.

## Live Website

`https://ng-course-recipe-book-4243a.web.app/`

## Test Login Details

Username: test@test.com 

Password: test123

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Features List

**Authentication System** - Sign Up/Sign In with Firebase.

**Recipes Page (View, Add, Edit, Delete)** - This will be empty upon log in, however the user can go to 'Manage' on the top right and then 'Fetch Data'. This will bring recipes onto the page for the user to look at. Clicking on a recipe will highlight and show an image of the final dish, along with a description and an ingredients list. The 'Manage Recipe' dropdown allows users to send all the ingredients to the Shopping List page, edit the recipe, or delete the recipe.

Clicking the 'New Recipe' button will display a form where the user can create their own recipe with a name, image URL, description and add ingredients dynamically too, depending on how many they need for the recipe. Upon clicking 'Save' above the form, this will list the recipe on the page with the others. To make sure your recipe is saved for next time, Users can go to 'Manage' in the top right of the page, and then 'Save Data', this will save it to the Firebase Database.

**Shopping List Page (View, Add, Edit, Delete)** - On this page, Users will find all their saved ingredients, if they have sent ingredients from the recipes page to this page, they shall see them listed here. They may add more manually with the form at the top of the page and are able to clear the form easily with a button. Upon clicking on an ingredient, it will fill the form in and allow the user to edit the ingredient name or amount and upon clicking 'Update', this will updated the selected ingredient. They may also delete the selected ingredient with the Remove Button displayed after selecting an ingredient too.

**'Manage' Dropdown on Navbar (Save/Fetch Data)** - The Manage dropdown allows for users to save all current recipes displayed on the Recipes page to the Firebase database or allow them to Fetch the recipes from the Firebase database which will be displayed on the Recipes page.



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
