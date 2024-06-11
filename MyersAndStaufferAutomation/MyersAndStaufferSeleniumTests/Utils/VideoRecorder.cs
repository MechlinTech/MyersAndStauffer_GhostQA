using MyersAndStaufferSeleniumTests.Arum.Mississippi.TestFile;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyersAndStaufferSeleniumTests.Utils
{
    public class VideoRecorder
    {
        private static Process ffmpegProcess;
        public static string basePath = TestExecutor.Basepath;
        public static string videoPath = Path.Combine(TestExecutor.Basepath, "Recordings", DateTime.Now.ToString("dd-MM-yyyy"));
        public static string outputFile = string.Empty;
        public static string screenshotDirectory;
        private static int stepcounter = 0;

        public static void ScreenShot(string datetime)
        {
            stepcounter++;
            string step = $"Step{stepcounter}";

            string basePath = Path.Combine(VideoRecorder.basePath, "screenshot");
            screenshotDirectory = Path.Combine(basePath, datetime);

            if (!Directory.Exists(screenshotDirectory))
            {
                Directory.CreateDirectory(screenshotDirectory);
            }

            string screenshotFile = Path.Combine(screenshotDirectory, step + ".png");
            Screenshot screenShot = ((ITakesScreenshot)Browser.Driver).GetScreenshot();
            screenShot.SaveAsFile(screenshotFile);
        }
        static int ExtractStepNumber(string filePath)
        {
            // Extract the step number from the file name
            string fileName = Path.GetFileNameWithoutExtension(filePath);
            string stepNumberString = fileName.Replace("Step", "");
            return int.Parse(stepNumberString);
        }

        public static void CreateRecordingfromSC()
        {
            if (!Directory.Exists(videoPath))
            {
                Directory.CreateDirectory(videoPath);
            }
            outputFile = Path.Combine(videoPath, DateTime.Now.ToString("HH-mm-ss") + ".mp4");
            string[] screenshotFiles = System.IO.Directory.GetFiles(screenshotDirectory, "*.png");
            screenshotFiles = screenshotFiles.OrderBy(file => ExtractStepNumber(file)).ToArray();
            string inputFiles = string.Join("|", screenshotFiles.Select(file => $"\"{file}\""));
            string ffmpegPath = @"/usr/bin/ffmpeg";
            string ffmpegArgs = $"-framerate 1 -i \"concat:{inputFiles}\" -c:v libx264 -r 30 -pix_fmt yuv420p  -vf \"scale=trunc(iw/2)*2:trunc(ih/2)*2\" \"{outputFile}\"";

            ProcessStartInfo startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = ffmpegArgs,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                CreateNoWindow = true
            };
            startInfo.RedirectStandardError = true;
            using (Process process = Process.Start(startInfo))
            {
                string standardError = process.StandardError.ReadToEnd();
                process.WaitForExit();
                int exitCode = process.ExitCode;

                if (exitCode == 0)
                {
                    Console.WriteLine("Video creation successful.");
                }
                else
                {
                    Console.WriteLine($"Error creating video. ffmpeg exited with code {exitCode}.");
                }
            }
        }
    }
}