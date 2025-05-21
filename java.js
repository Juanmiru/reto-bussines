 document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registrationForm');
            const successAlert = document.getElementById('successAlert');
            const errorAlert = document.getElementById('errorAlert');
            const whatsappPreview = document.getElementById('whatsappPreview');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Hide any previous alerts
                successAlert.style.display = 'none';
                errorAlert.style.display = 'none';
                whatsappPreview.style.display = 'none';
                
                // Get form data
                const formData = new FormData(form);
                
                // Add hidden fields required by the API
                formData.append('aliado', 'NA');
                formData.append('cerrar_sesiones', 'on');
                
                // Get the selected course value and map it to the code
                const cursoSelect = document.getElementById('curso');
                const codigoValue = cursoSelect.value;
                formData.set('codigo', codigoValue);
                
                // Send the data to the API
                fetch('https://wa.toolia.site/add_user', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(data => {
                            throw new Error(data.error || 'Error en el registro');
                        });
                    }
                    return response.text();
                })
                .then(data => {
                    // Show success message
                    successAlert.textContent = data;
                    successAlert.style.display = 'block';
                    whatsappPreview.style.display = 'block';
                    
                    // Clear form
                    form.reset();
                    
                    // Scroll to success message
                    successAlert.scrollIntoView({ behavior: 'smooth' });
                })
                .catch(error => {
                    errorAlert.textContent = error.message;
                    errorAlert.style.display = 'block';
                });
            });
        });