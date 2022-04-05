#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNAPSAdsModule, NSObject)

RCT_EXTERN_METHOD(initialize:(NSDictionary)appKey
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setAdNetworkInfo:(NSDictionary)adNetworkInfoDic)

RCT_EXTERN_METHOD(setTestMode:(BOOL)enabled)

RCT_EXTERN_METHOD(setUseGeoLocation:(BOOL)enabled)

@end
