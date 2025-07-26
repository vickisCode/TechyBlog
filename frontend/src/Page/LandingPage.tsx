import HomePage from '../Page/Home';
import ShowBlog from '../Components/BlogCard';
import Alert from '../Page/effect'
function LandingPage() {
  return (
    <div>
      <Alert />
      <HomePage />

      <ShowBlog />

    </div>
  )
}

export default LandingPage