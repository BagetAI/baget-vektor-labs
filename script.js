document.addEventListener('DOMContentLoaded', () => {
    const leadForm = document.getElementById('leadForm');
    const formStatus = document.getElementById('formStatus');
    const databaseId = '98b4d0f7-fc0f-4260-9e55-81ba19f10ae6';

    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = leadForm.querySelector('button');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';
            formStatus.innerText = '';
            
            const formData = new FormData(leadForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                message: formData.get('message')
            };

            try {
                const response = await fetch(`https://baget.ai/api/public/databases/${databaseId}/rows`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data })
                });

                if (response.ok) {
                    formStatus.style.color = '#10B981';
                    formStatus.innerText = 'Inquiry sent successfully. We will be in touch.';
                    leadForm.reset();
                } else {
                    throw new Error('Failed to submit');
                }
            } catch (error) {
                formStatus.style.color = '#EF4444';
                formStatus.innerText = 'Something went wrong. Please try again.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .price-card, .comparison-table').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
