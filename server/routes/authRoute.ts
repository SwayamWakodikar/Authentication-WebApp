import { Request, Response, Router } from "express";
import { handleUserSignUp, handleUserLogin } from "../controllers/authController.js";
import passport from 'passport';

const router = Router();
router.post('/signup', handleUserSignUp);
router.post('/login', handleUserLogin);
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:5173/dashboard',
        failureRedirect: 'http://localhost:5173/login'
    })
);

router.get('/user', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = req.user as any;
    res.json({
        name: user.name,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=200&background=8b5cf6&color=fff`
    });
});

router.get('/', (req: Request, res: Response) => {
    res.send("Authentication Route Works")
})
export default router;