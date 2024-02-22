﻿using Microsoft.Extensions.Configuration;
using MyersAndStaufferFramework;
using System.Collections.Specialized;

namespace MyersAndStaufferSeleniumTests.Utils
{
    public static class EnvironmentConfigUtils
    {
        public const string ConfigNameFile = "env.config";

        public static EnvironmentHelper GetEnvironmentForConfig()
        {
            string configName = string.Empty;
            if (File.Exists(Path.Join(AppDomain.CurrentDomain.BaseDirectory, ConfigNameFile)))
            {
                // Read the running config name from file env.config created on the PostBuild task
                configName = File.ReadAllText(Path.Join(AppDomain.CurrentDomain.BaseDirectory, ConfigNameFile)).Trim();
            }

            IConfiguration config = EnvironmentHelperUtils.GetCurrentConfiguration(configName, useCache: false);
            NameValueCollection appSettings = EnvironmentHelperUtils.GetAppSettings(config);
            NameValueCollection connectionStrings = EnvironmentHelperUtils.GetConnectionStrings(config);

            return new EnvironmentHelper(appSettings, connectionStrings, config);
        }
    }
}