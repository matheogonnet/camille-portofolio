'use client'

import { useState } from 'react'
import anime from 'animejs'

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Animation de soumission
    anime({
      targets: '.submit-button',
      scale: [1, 0.95],
      duration: 100,
      easing: 'easeInOutQuad',
      complete: () => {
        anime({
          targets: '.submit-button',
          scale: [0.95, 1],
          duration: 300,
          easing: 'easeOutElastic(1, .5)'
        })
      }
    })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      setFormState({ name: '', email: '', message: '' })

      // Message de succès qui disparaît après 5 secondes
      setTimeout(() => setSubmitStatus('idle'), 5000)

    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Nom */}
        <div className="space-y-2">
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formState.name}
            onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors duration-200"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors duration-200"
            required
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label 
          htmlFor="message" 
          className="block text-sm font-medium text-gray-500 uppercase tracking-wider"
        >
          Message
        </label>
        <textarea
          id="message"
          value={formState.message}
          onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
          rows={6}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors duration-200 resize-none"
          required
        />
      </div>

      {/* Messages de statut */}
      {submitStatus !== 'idle' && (
        <div 
          className={`
            fixed bottom-8 right-8 
            ${submitStatus === 'success' ? 'bg-gray-900' : 'bg-red-500'} 
            text-white px-6 py-4 rounded-xl shadow-lg
            transform transition-all duration-500 ease-out
            animate-slide-in-right
            flex items-center gap-3
          `}
        >
          {submitStatus === 'success' ? (
            <>
              <i className="bi bi-check-circle text-xl"></i>
              <div className="space-y-1">
                <p className="font-medium">Message sent!</p>
                <p className="text-sm opacity-90">Thank you for reaching out.</p>
              </div>
            </>
          ) : (
            <>
              <i className="bi bi-exclamation-circle text-xl"></i>
              <div className="space-y-1">
                <p className="font-medium">Failed to send</p>
                <p className="text-sm opacity-90">Please try again later.</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Bouton d'envoi */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-button group relative inline-flex items-center justify-center gap-3 px-10 py-3 bg-gray-900 hover:bg-gray-800 rounded-xl transition-all duration-300 disabled:opacity-70"
        >
          <span className={`font-serif text-lg text-white flex items-center gap-3 ${
            isSubmitting ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-200`}>
            Send Message
            <i className="bi bi-send text-lg group-hover:translate-x-1 transition-transform duration-200"></i>
          </span>
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </button>
      </div>
    </form>
  )
} 