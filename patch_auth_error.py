import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

old_catch_signup = '''      } catch (err) {
        toast.error("Signup failed: " + err.message);
      }'''

new_catch_signup = '''      } catch (err) {
        if (err.code === 'auth/operation-not-allowed') {
          toast.error("Email/Password Auth is disabled. Please enable it in the Firebase Console under Build > Authentication > Sign-in method.");
        } else {
          toast.error("Signup failed: " + err.message);
        }
      }'''

content = content.replace(old_catch_signup, new_catch_signup)

old_catch_login = '''      } catch (err) {
        toast.error("Login failed: " + err.message);
      }'''

new_catch_login = '''      } catch (err) {
        if (err.code === 'auth/operation-not-allowed') {
          toast.error("Email/Password Auth is disabled. Please enable it in the Firebase Console under Build > Authentication > Sign-in method.");
        } else {
          toast.error("Login failed: " + err.message);
        }
      }'''

content = content.replace(old_catch_login, new_catch_login)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
