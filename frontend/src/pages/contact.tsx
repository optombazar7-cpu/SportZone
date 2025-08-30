import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ism kiritish majburiy';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email kiritish majburiy';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email formati noto\'g\'ri';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon raqam kiritish majburiy';
    } else if (!/^(\+998|998)?[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Telefon raqam formati noto\'g\'ri';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Xabar matnini kiriting';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitContactMutation = useMutation({
    mutationFn: async (contactData: typeof formData) => {
      // Simulate API call - in real implementation, this would send to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Xabar yuborildi!",
        description: "Tez orada siz bilan bog'lanamiz",
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    },
    onError: () => {
      toast({
        title: "Xatolik",
        description: "Xabar yuborishda xatolik yuz berdi",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    submitContactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      details: ['+998 90 123 45 67', '+998 91 987 65 43'],
      bgColor: 'bg-primary',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@sportzone.uz', 'support@sportzone.uz'],
      bgColor: 'bg-secondary',
    },
    {
      icon: MapPin,
      title: 'Manzil',
      details: ['Toshkent shahar, Amir Temur ko\'chasi 120', 'Magic City, 1-qavat'],
      bgColor: 'bg-accent',
    },
    {
      icon: Clock,
      title: 'Ish Vaqti',
      details: ['Dushanba - Shanba: 9:00 - 21:00', 'Yakshanba: 10:00 - 18:00'],
      bgColor: 'bg-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground mb-4" data-testid="contact-title">
            Biz Bilan Bog'laning
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="contact-description">
            Savollaringiz bormi? Biz har doim yordam berishga tayyormiz!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8" data-testid="contact-info-section">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4" data-testid={`contact-info-${index}`}>
                <div className={`w-12 h-12 ${info.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <info.icon className="text-white h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-poppins font-semibold text-foreground mb-1" data-testid={`contact-info-title-${index}`}>
                    {info.title}
                  </h3>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-muted-foreground" data-testid={`contact-info-detail-${index}-${detailIndex}`}>
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Map Placeholder */}
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center" data-testid="map-placeholder">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Bizning joylashuvimiz</p>
                <p className="text-sm text-muted-foreground">Toshkent, Amir Temur ko'chasi 120</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card data-testid="contact-form-card">
            <CardHeader>
              <CardTitle>Xabar Yuborish</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <Label htmlFor="name">Ismingiz *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ismingizni kiriting"
                    className={errors.name ? 'border-destructive' : ''}
                    data-testid="input-contact-name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1" data-testid="error-contact-name">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email@example.com"
                    className={errors.email ? 'border-destructive' : ''}
                    data-testid="input-contact-email"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1" data-testid="error-contact-email">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className={errors.phone ? 'border-destructive' : ''}
                    data-testid="input-contact-phone"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1" data-testid="error-contact-phone">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Xabaringiz *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Xabaringizni yozing..."
                    rows={4}
                    className={errors.message ? 'border-destructive' : ''}
                    data-testid="input-contact-message"
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1" data-testid="error-contact-message">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full btn-primary font-montserrat font-semibold"
                  disabled={submitContactMutation.isPending}
                  data-testid="submit-contact-form"
                >
                  {submitContactMutation.isPending ? (
                    'Yuborilmoqda...'
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Xabar Yuborish
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-muted/20 rounded-lg p-8" data-testid="additional-info">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-poppins font-bold text-foreground mb-4">Qo'shimcha Ma'lumotlar</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div data-testid="delivery-info">
              <h3 className="text-lg font-semibold text-foreground mb-3">Yetkazib Berish</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Toshkent shahri bo'yicha: Bepul</li>
                <li>• Viloyatlarga: 25,000 so'm</li>
                <li>• Yetkazib berish muddati: 1-3 kun</li>
                <li>• Express yetkazib berish: +50,000 so'm</li>
              </ul>
            </div>
            
            <div data-testid="return-policy">
              <h3 className="text-lg font-semibold text-foreground mb-3">Qaytarish Siyosati</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 14 kun ichida qaytarish mumkin</li>
                <li>• Mahsulot asl holatida bo'lishi kerak</li>
                <li>• Qaytarish bepul (bizning xatomiz bo'lsa)</li>
                <li>• Pul 3-5 ish kuni ichida qaytariladi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
