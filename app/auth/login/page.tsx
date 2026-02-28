import { AuthLayout } from "@/components/shared/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <AuthLayout
            imageSrc="/images/umbrella-rocks.png"
            quote="Agno's Umbrella Rocks represent the timeless beauty of our coastal heritage. A true marvel of nature."
            author="LOCAL TOURISM OFFICE"
        >
            <LoginForm />
        </AuthLayout>
    );
}
