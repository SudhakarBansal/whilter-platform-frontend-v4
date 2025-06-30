import React from 'react';
import {
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { menuItems } from '@/data/menuItems.data';
import Image from 'next/image';
import Link from 'next/link';

export const Sidebar = () => {
  return (
    <>
      <Box component="svg" width="0" height="0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="sidebar-clip" clipPathUnits="objectBoundingBox">
            <path d="M0 0C0 0 0.15 0.05 0.45 0.08C0.75 0.11 0.85 0.15 0.85 0.2C0.85 0.25 0.85 0.75 0.85 0.75C0.85 0.8 0.85 0.85 0.85 0.85C0.85 0.89 0.75 0.92 0.45 0.95C0.15 0.98 0 1 0 1V0Z" />
          </clipPath>
        </defs>
      </Box>

      <Box className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 h-screen pointer-events-none">
        <Box className="absolute top-1/2 left-0 transform -translate-y-1/2 pointer-events-auto group">

          {/* Sidebar container */}
          <Box
            className="relative shadow-2xl transition-all duration-300 ease-in-out"
            sx={{
              width: {
                xs: '20px',
                sm: '24px',
                md: '28px',
              },
              '&:hover': {
                width: {
                  xs: '64px',
                  sm: '80px',
                  md: '88px',
                }
              },
              height: {
                xs: 'min(85vh, 500px)',
                sm: 'min(85vh, 500px)',
                md: '85vh'
              },
              minHeight: {
                xs: `${menuItems.length * 48 + 32}px`,
                sm: `${menuItems.length * 52 + 40}px`,
                md: `${menuItems.length * 56 + 48}px`,
              },
              clipPath: 'url(#sidebar-clip)',
              background: 'linear-gradient(90deg, #111A99 -0.96%, #8F71EC 113.71%)',
            }}
          >
            <Box className="relative z-10 flex flex-col items-center justify-center h-full p-2">
              <Box
                className="flex flex-col items-center justify-center flex-1"
                sx={{
                  gap: {
                    xs: 2,
                    sm: 2,
                    md: 3,
                  }
                }}
              >
                {menuItems.map((item, index) => (
                  <Box key={index} className="relative group/item flex justify-center">
                    <Tooltip title={item.label} placement="right" arrow>
                      <Link href={item.href} prefetch scroll>
                        <IconButton
                          component="span"
                          className="relative rounded-xl transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                          aria-label={item.label}
                          sx={{
                            width: {
                              xs: '32px',
                              sm: '36px',
                              md: '40px',
                            },
                            height: {
                              xs: '32px',
                              sm: '36px',
                              md: '40px',
                            },
                            minWidth: 'auto',
                            minHeight: 'auto',
                            '&:focus': {
                              outline: 'none',
                              ring: 2,
                              ringColor: 'white/30',
                            }
                          }}
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={item.icon}
                              alt={item.label}
                              fill
                              className="object-contain transition-all duration-300"
                              style={{
                                filter: 'brightness(0) invert(1)',
                              }}
                              sizes="(max-width: 640px) 18px, (max-width: 768px) 20px, 24px"
                            />
                          </div>
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Hover Indicator */}
          <Box
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out"
            sx={{
              right: {
                xs: '2px',
                sm: '3px',
                md: '4px',
                '&:hover': {
                  xs: '4px',
                  sm: '6px',
                  md: '8px',
                }
              }
            }}
          >
            <Box
              className="backdrop-blur-sm bg-paper rounded-full transition-all duration-300 ease-in-out"
              sx={{
                height: {
                  xs: '48px',
                  sm: '56px',
                  md: '64px',
                },
                width: '4px',
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
