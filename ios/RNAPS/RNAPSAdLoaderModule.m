#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Aps, NSObject)

RCT_EXTERN_METHOD(loadAd:(NSDictionary)options
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

@end
