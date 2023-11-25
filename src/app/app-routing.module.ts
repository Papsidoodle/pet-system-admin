import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'homescreen',
    pathMatch: 'full',
  },
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./pages/onboarding/onboarding.module').then(
        (m) => m.OnboardingPageModule
      ),
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./pages/splash/splash.module').then((m) => m.SplashPageModule),
  },
  {
    path: 'homescreen',
    loadChildren: () =>
      import('./pages/homescreen/homescreen.module').then(
        (m) => m.HomescreenPageModule
      ),
  },
  {
    path: 'cat-main/:id',
    loadChildren: () =>
      import('./pages/pets-content/cats-content/cat-main/cat-main.module').then(
        (m) => m.CatMainPageModule
      ),
  },
  {
    path: 'cat-info/:id',
    loadChildren: () =>
      import('./pages/pets-content/cats-content/cat-info/cat-info.module').then(
        (m) => m.CatInfoPageModule
      ),
  },
  {
    path: 'dog-info/:id',
    loadChildren: () =>
      import('./pages/pets-content/dogs-content/dog-info/dog-info.module').then(
        (m) => m.DogInfoPageModule
      ),
  },
  {
    path: 'dog-main/:id',
    loadChildren: () =>
      import('./pages/pets-content/dogs-content/dog-main/dog-main.module').then(
        (m) => m.DogMainPageModule
      ),
  },
  {
    path: 'cat-meds/:id',
    loadChildren: () =>
      import('./pages/pets-content/cats-content/cat-meds/cat-meds.module').then(
        (m) => m.CatMedsPageModule
      ),
  },
  {
    path: 'cat-foods/:id',
    loadChildren: () =>
      import(
        './pages/pets-content/cats-content/cat-foods/cat-foods.module'
      ).then((m) => m.CatFoodsPageModule),
  },
  {
    path: 'cat-grooming/:id',
    loadChildren: () =>
      import(
        './pages/pets-content/cats-content/cat-grooming/cat-grooming.module'
      ).then((m) => m.CatGroomingPageModule),
  },
  {
    path: 'cat-activities/:id',
    loadChildren: () =>
      import(
        './pages/pets-content/cats-content/cat-activities/cat-activities.module'
      ).then((m) => m.CatActivitiesPageModule),
  },
  {
    path: 'dog-foods/:id',
    loadChildren: () =>
      import(
        './pages/pets-content/dogs-content/dog-foods/dog-foods.module'
      ).then((m) => m.DogFoodsPageModule),
  },
  {
    path: 'dog-activities/:id',
    loadChildren: () =>
      import(
        './pages/pets-content/dogs-content/dog-activities/dog-activities.module'
      ).then((m) => m.DogActivitiesPageModule),
  },
  {
    path: 'dog-grooming/:id',
    loadChildren: () =>
      import(
        './pages/pets-content/dogs-content/dog-grooming/dog-grooming.module'
      ).then((m) => m.DogGroomingPageModule),
  },
  {
    path: 'dog-meds/:id',
    loadChildren: () =>
      import('./pages/pets-content/dogs-content/dog-meds/dog-meds.module').then(
        (m) => m.DogMedsPageModule
      ),
  },
  {
    path: 'dog-add',
    loadChildren: () =>
      import('./pages/pets-content/dogs-content/dog-add/dog-add.module').then(
        (m) => m.DogAddPageModule
      ),
  },
  {
    path: 'dog-update/:id',
    loadChildren: () =>
      import(
        './pages/pets-content/dogs-content/dog-update/dog-update.module'
      ).then((m) => m.DogUpdatePageModule),
  },
  {
    path: 'cat-add',
    loadChildren: () =>
      import('./pages/pets-content/cats-content/cat-add/cat-add.module').then(
        (m) => m.CatAddPageModule
      ),
  },
  {
    path: 'cat-update/:id',
    loadChildren: () =>
      import(
        './pages/pets-content/cats-content/cat-update/cat-update.module'
      ).then((m) => m.CatUpdatePageModule),
  },
  {
    path: 'pets-info',
    loadChildren: () =>
      import('./pages/pets-info/pets-info.module').then(
        (m) => m.PetsInfoPageModule
      ),
  },
  {
    path: 'user-info/:uid',
    loadChildren: () =>
      import('./pages/user-info/user-info.module').then(
        (m) => m.UserInfoPageModule
      ),
  },
  {
    path: 'user-info/:uid',
    loadChildren: () =>
      import('./services/pet/user-pets/user-pets.module').then(
        (m) => m.UserPetsPageModule
      ),
    pathMatch: 'full',
  },
  {
    path: 'add-pet-modal',
    loadChildren: () => import('./pages/add-pet-modal/add-pet-modal.module').then( m => m.AddPetModalPageModule)
  },
  {
    path: 'owners-pet/:uid/:petId',
    loadChildren: () => import('./pages/pets-content/owners-pet/owners-pet.module').then( m => m.OwnersPetPageModule)
  },
  {
    path: 'owners-pet-update/:uid/:petId',
    loadChildren: () => import('./pages/pets-content/owners-pet-update/owners-pet-update.module').then( m => m.OwnersPetUpdatePageModule)
  },
  {
    path: 'schedule/:uid/:petId',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'appointments/:uid/:petId/:appointmentType',
    loadChildren: () => import('./pages/appointments/appointments.module').then( m => m.AppointmentsPageModule)
  },



  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
