import Detox, { device, expect, element, by, waitFor } from 'detox';
import { jestExpect } from './jestExpect';

describe('React Native APS Example app', () => {
  beforeAll(async () => {
    await device.launchApp();
    await device.reloadReactNative();
  });

  it('should load default screen', async () => {
    await expect(element(by.id('test_banner'))).toExist();
    await expect(element(by.id('test_interstitial'))).toExist();
  });

  describe('APSAds test', () => {
    it('should be visible', async () => {
      await expect(element(by.id('initStatus_text'))).toExist();
    });

    it('should initialize SDK', async () => {
      await waitFor(element(by.id('initStatus_text')))
        .toHaveText('initialized : true')
        .withTimeout(10000);
    });
  });

  describe('Banner test', () => {
    jest.retryTimes(3);

    beforeAll(async () => {
      await element(by.id('test_banner')).tap();
    });

    it('should be visible', async () => {
      await expect(element(by.id('status_text'))).toExist();
      await expect(element(by.id('kvs_text'))).toExist();
      await expect(element(by.id('error_text'))).toExist();
    });

    it('should load bid', async () => {
      const statusText = element(by.id('status_text'));
      const kvsText = element(by.id('kvs_text'));
      const errorText = element(by.id('error_text'));

      await waitFor(statusText).not.toHaveText('loading').withTimeout(10000);

      const statusAttrs =
        (await statusText.getAttributes()) as Detox.ElementAttributes;
      const bidStatus = statusAttrs.text;

      jestExpect(bidStatus).toMatch(/success|fail/);

      if (bidStatus === 'success') {
        const kvsAttrs =
          (await kvsText.getAttributes()) as Detox.ElementAttributes;
        const kvs = JSON.parse(kvsAttrs.text);

        jestExpect(kvs.amzn_b).toBeDefined();
        jestExpect(kvs.amzn_h).toBeDefined();
        jestExpect(kvs.amznslots).toBeDefined();
        jestExpect(kvs.amznp).toBeDefined();
      } else {
        const errorAttrs =
          (await errorText.getAttributes()) as Detox.ElementAttributes;
        const errorCode = errorAttrs.text;

        jestExpect(errorCode).toMatch(
          /network_error|network_timeout|no_fill|internal_error|request_error/
        );
      }

      jestExpect(bidStatus).toBe('success');
    });
  });

  describe('Interstitial test', () => {
    jest.retryTimes(3);

    beforeAll(async () => {
      await element(by.id('test_interstitial')).tap();
    });

    it('should be visible', async () => {
      await expect(element(by.id('kvs_text'))).toExist();
      await expect(element(by.id('error_text'))).toExist();
    });

    it('should load bid', async () => {
      const statusText = element(by.id('status_text'));
      const kvsText = element(by.id('kvs_text'));
      const errorText = element(by.id('error_text'));

      await waitFor(statusText).not.toHaveText('loading').withTimeout(10000);

      const statusAttrs =
        (await statusText.getAttributes()) as Detox.ElementAttributes;
      const bidStatus = statusAttrs.text;

      jestExpect(bidStatus).toMatch(/success|fail/);

      if (bidStatus === 'success') {
        const kvsAttrs =
          (await kvsText.getAttributes()) as Detox.ElementAttributes;
        const kvs = JSON.parse(kvsAttrs.text);

        jestExpect(kvs.amzn_b).toBeDefined();
        jestExpect(kvs.amzn_h).toBeDefined();
        jestExpect(kvs.amznslots).toBeDefined();
        jestExpect(kvs.amznp).toBeDefined();
      } else {
        const errorAttrs =
          (await errorText.getAttributes()) as Detox.ElementAttributes;
        const errorCode = errorAttrs.text;

        jestExpect(errorCode).toMatch(
          /network_error|network_timeout|no_fill|internal_error|request_error/
        );
      }

      jestExpect(bidStatus).toBe('success');
    });
  });
});
