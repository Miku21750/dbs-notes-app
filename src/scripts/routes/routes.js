import HomePresenter from '../pages/presenter/home-presenter';
import AddStoryPresenter from '../pages/presenter/addstory-presenter';
import LoginPresenter from '../pages/presenter/login-presenter';
import RegisterPresenter from '../pages/presenter/register-presenter';
import OfflineStoriesPresenter from '../pages/presenter/offlinestory-presenter';

const routes = {
  '/': new HomePresenter(),
  '/tambah' : new AddStoryPresenter(),
  '/login' : new LoginPresenter(),
  '/register' : new RegisterPresenter(),
  '/offline' : new OfflineStoriesPresenter({content: document.querySelector('#main-content')})
};

export default routes;
