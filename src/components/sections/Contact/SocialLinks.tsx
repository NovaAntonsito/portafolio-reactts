import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import type { SocialLink } from '../../../types';
import './SocialLinks.scss';

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

const getSocialIcon = (platform: SocialLink['platform']) => {
  switch (platform) {
    case 'instagram':
      return FaInstagram;
    case 'linkedin':
      return FaLinkedin;
    case 'github':
      return FaGithub;
    default:
      return FaGithub;
  }
};

const getPlatformName = (platform: SocialLink['platform']) => {
  switch (platform) {
    case 'instagram':
      return 'Instagram';
    case 'linkedin':
      return 'LinkedIn';
    case 'github':
      return 'GitHub';
    default:
      return platform;
  }
};

export const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {
  return (
    <div className="social-links">
      <h3 className="social-links__title">Sígueme en</h3>
      <div className="social-links__list">
        {socialLinks.map((link) => {
          const IconComponent = getSocialIcon(link.platform);
          const platformName = getPlatformName(link.platform);
          
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-links__item"
              aria-label={`Visitar perfil de ${platformName}`}
            >
              <div className="social-links__icon">
                <IconComponent />
              </div>
              <div className="social-links__info">
                <span className="social-links__platform">{platformName}</span>
                <span className="social-links__username">@{link.username}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};