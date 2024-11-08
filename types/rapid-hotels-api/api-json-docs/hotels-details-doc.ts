// api/hotels/details API route

// API output Response JSON
export type APIHotelDetailsResponseJSON = {
  __typename?: string;
  summary?: {
    __typename?: string;
    fees?: any;
    id?: string;
    name?: string;
    map?: {
      __typename?: string;
      markers?: any;
    };
    policies?: {
      __typename?: string;
      checkinEnd?: string | null;
      checkinInstructions?: string[];
      checkinMinAge?: number | null;
      checkinStart?: string | null;
      checkoutTime?: string | null;
      childAndBed?: any;
      needToKnow?: {
        __typename?: string;
        body?: string[];
        descriptions?: string[];
        title?: string;
      };
      paymentOptions?: any[];
      pets?: {
        __typename?: string;
        body?: string[];
        descriptions?: string[];
        title?: string;
      };
      shouldMention?: {
        __typename?: string;
        body?: string[];
        descriptions?: string[];
        title?: string;
      };
    };
    telesalesPhoneNumber?: string;
    bannerMessage?: string | null;
    latinAlphabetName?: string;
    tagline?: string;
    starRatingIcon?: {
      __typename?: string;
      token?: string;
    };
    overview?: {
      __typename?: string;
      vipMessaging?: string;
      inventoryType?: string | null;
      accessibilityLabel?: string;
      label?: string | null;
      propertyRating?: {
        __typename?: string;
        rating?: number;
        accessibility?: string;
        icon?: {
          __typename?: string;
          id?: string;
          description?: string;
          size?: string | null;
          token?: string;
          theme?: string | null;
        };
      };
    };
    featuredMessages?: string | null;
    spaceOverview?: any;
    amenities?: {
      __typename?: string;
      amenities?: {
        __typename?: string;
        title?: string;
        sections?: any[];
        header?: {
          __typename?: string;
          icon?: string | null;
          text?: string;
          subText?: string | null;
        };
        contents?: {
          __typename?: string;
          header?: {
            __typename?: string;
            text?: string;
            subText?: string | null;
            mark?: string | null;
          };
          icon?: {
            __typename?: string;
            id?: string;
            description?: string;
            size?: string | null;
            token?: string;
            theme?: string | null;
          };
          jumpLink?: string | null;
          items?: {
            __typename?: string;
            text?: string;
            state?: string | null;
            moreInfo?: string | null;
            icon?: string | null;
          }[];
        }[];
      }[];
      topAmenities?: {
        __typename?: string;
        header?: {
          __typename?: string;
          text?: string;
          subText?: string | null;
          mark?: string | null;
        };
        icon?: string | null;
        jumpLink?: string | null;
        items?: {
          __typename?: string;
          text?: string;
          state?: string | null;
          moreInfo?: string | null;
          icon?: {
            __typename?: string;
            id?: string;
            description?: string;
            size?: string | null;
            token?: string;
            theme?: string | null;
          };
        }[];
      };
    };
    propertyContentPreferences?: any | null;
    amenitiesDialog?: {
      __typename?: string;
      trigger?: {
        __typename?: string;
        value?: string;
        icon?: {
          __typename?: string;
          id?: string;
          description?: string;
          size?: string | null;
          token?: string;
          theme?: string | null;
        };
        clientSideAnalytics?: {
          __typename?: string;
          linkName?: string;
          referrerId?: string;
        };
      };
      toolbar?: {
        __typename?: string;
        title?: string;
      } | null;
    };
    takeover?: {
      __typename?: string;
      amenityClosures?: any;
      highlight?: {
        __typename?: string;
        header?: {
          __typename?: string;
          text?: string;
          subText?: string | null;
          mark?: string | null;
        };
        icon?: string | null;
        jumpLink?: string | null;
        items?: {
          __typename?: string;
          text?: string;
          state?: string | null;
          moreInfo?: string | null;
          icon?: {
            __typename?: string;
            id?: string;
            description?: string;
            size?: string | null;
            token?: string;
            theme?: string | null;
          };
        }[];
      }[];
      property?: {
        __typename?: string;
        header?: {
          __typename?: string;
          text?: string;
          subText?: string | null;
          mark?: string | null;
        };
        icon?: {
          __typename?: string;
          id?: string;
          description?: string;
          size?: string | null;
          token?: string;
          theme?: string | null;
        };
        jumpLink?: string | null;
        items?: {
          __typename?: string;
          text?: string;
          state?: string | null;
          moreInfo?: string | null;
          icon?: {
            __typename?: string;
            id?: string;
            description?: string;
            size?: string | null;
            token?: string;
            theme?: string | null;
          };
        }[];
      }[];
    };
    cleaningAndSafety?: any;
    location?: {
      __typename?: string;
      address?: {
        __typename?: string;
        addressLine?: string;
        city?: string;
        province?: string;
        countryCode?: string;
        firstAddressLine?: string;
        secondAddressLine?: string;
      };
      coordinates?: {
        __typename?: string;
        latitude?: number;
        longitude?: number;
      };
      multiCityRegion?: {
        __typename?: string;
        id?: string;
      };
      whatsAround?: {
        __typename?: string;
        editorial?: {
          __typename?: string;
          title?: string;
          content?: string[];
        };
      };
      mapDialog?: {
        __typename?: string;
        trigger?: {
          __typename?: string;
          value?: string;
          icon?: {
            __typename?: string;
            id?: string;
            description?: string;
            size?: string | null;
            token?: string;
            theme?: string | null;
          };
          clientSideAnalytics?: {
            __typename?: string;
            linkName?: string;
            referrerId?: string;
          };
        };
        toolbar?: string | null;
      };
      staticImage?: {
        __typename?: string;
        description?: string;
        url?: string;
        aspectRatio?: number | null;
      };
    };
    nearbyPOIs?: {
      __typename?: string;
      header?: {
        __typename?: string;
        text?: string;
        subText?: string | null;
        mark?: string | null;
      };
      icon?: string | null;
      jumpLink?: string | null;
      items?: {
        __typename?: string;
        text?: string;
        state?: string | null;
        moreInfo?: string | null;
        icon?: {
          __typename?: string;
          id?: string;
          description?: string;
          size?: string | null;
          token?: string;
          theme?: string | null;
        };
      }[];
    };
    lodgingChatbot?: any;
  };
  propertyGallery?: {
    __typename?: string;
    imagesGrouped?: any;
    images?: {
      __typename?: string;
      accessibilityText?: string;
      actionLabel?: string;
      imageId?: string;
      image?: {
        __typename?: string;
        url?: string;
        description?: string;
      };
    }[];
    accessibilityLabel?: string;
    thumbnailGalleryDialog?: {
      __typename?: string;
      trigger?: {
        __typename?: string;
        value?: string;
        icon?: {
          __typename?: string;
          id?: string;
          description?: string;
          size?: string | null;
          token?: string;
          theme?: string | null;
        };
        clientSideAnalytics?: {
          __typename?: string;
          linkName?: string;
          referrerId?: string;
        };
      };
      toolbar?: {
        __typename?: string;
        title?: string;
        icon?: {
          __typename?: string;
          id?: string;
          description?: string;
          size?: string | null;
          token?: string;
          theme?: string | null;
        };
        clientSideAnalytics?: any;
      };
    };
    mediaGalleryDialog?: {
      __typename?: string;
      trigger?: {
        __typename?: string;
        value?: string;
        icon?: string | null;
        clientSideAnalytics?: any;
      };
      toolbar?: {
        __typename?: string;
        title?: string;
        icon?: {
          __typename?: string;
          id?: string;
          description?: string;
          size?: string | null;
          token?: string;
          theme?: string | null;
        };
        clientSideAnalytics?: any;
      };
    };
  };
  reviewInfo?: {
    __typename?: string;
    summary?: {
      __typename?: string;
      overallScoreWithDescriptionA11y?: {
        __typename?: string;
        value?: string;
      };
      propertyReviewCountDetails?: {
        __typename?: string;
        shortDescription?: string;
      };
      highlightMessage?: string | null;
      seeAllAction?: {
        __typename?: string;
        trigger?: {
          __typename?: string;
          clientSideAnalytics?: {
            __typename?: string;
            linkName?: string;
            referrerId?: string;
          };
        };
      };
    };
  };
  propertyContentSectionGroups?: {
    __typename?: string;
    cleanliness?: any;
    aboutThisProperty?: {
      __typename?: string;
      sectionName?: string | null;
      sections?: {
        __typename?: string;
        sectionName?: string | null;
        header?: {
          __typename?: string;
          icon?: string | null;
          text?: string;
          subText?: string | null;
        };
        bodySubSections?: {
          __typename?: string;
          elements?: {
            __typename?: string;
            header?: {
              __typename?: string;
              text?: string;
              subText?: string | null;
              icon?: string | null;
              headerImage?: string | null;
            };
            items?: {
              __typename?: string;
              content?: {
                __typename?: string;
                primary?: {
                  __typename?: string;
                  value?: string;
                  accessibilityLabel?: string | null;
                  icon?: string | null;
                };
                secondary?: string | null;
              };
            }[];
            expando?: any;
            maxColumns?: number;
          }[];
        }[];
        action?: any;
      }[];
    };
    policies?: {
      __typename?: string;
      sectionName?: string | null;
      sections?: {
        __typename?: string;
        sectionName?: string | null;
        header?: {
          __typename?: string;
          icon?: string | null;
          text?: string;
          subText?: string | null;
        };
        bodySubSections?: {
          __typename?: string;
          elements?: {
            __typename?: string;
            header?: {
              __typename?: string;
              text?: string;
              subText?: string | null;
              icon?: string | null;
              headerImage?: string | null;
            };
            items?: {
              __typename?: string;
              content?: {
                __typename?: string;
                primary?: {
                  __typename?: string;
                  value?: string;
                  accessibilityLabel?: string | null;
                  icon?: string | null;
                };
                secondary?: string | null;
              };
            }[];
            expando?: any;
            maxColumns?: number;
          }[];
        }[];
        action?: any;
      }[];
    };
    importantInfo?: any;
  };
  saveTripItem?: any;
};
