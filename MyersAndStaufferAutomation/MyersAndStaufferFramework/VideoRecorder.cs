using System;
using System.Diagnostics;
using System.IO;


namespace MyersAndStaufferFramework
{
    public class VideoRecorder : DBConfiguration
    {
        public static string basePath = string.Empty;// GetDBConnectionString("AppSettings:basePath");
        public static string videoPath = "";    
       
        private static Process ffmpegProcess;

        public static void CreateRecording(string _basePath)
        {
            basePath = _basePath;
            String ffmpegPath = @"C:\ffmpeg-6.1.1-essentials_build\bin\ffmpeg.exe";
            // Example FFmpeg command to start recording
            string command = $"{ffmpegPath} -f gdigrab -framerate 30 -i desktop -c:v libx264rgb -preset ultrafast -qp 0 -f mp4 ${basePath}";

            // Start FFmpeg process
            ffmpegProcess = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    RedirectStandardInput = true,
                    UseShellExecute = false,
                    CreateNoWindow = false
                }
            };
            ffmpegProcess.Start();
            Console.WriteLine("Recoridng Started....");

            // Send the FFmpeg command to cmd.exe
            ffmpegProcess.StandardInput.WriteLine(command);
        }

        private static string GetRecordingFolderPath(string folderName)
        {
            videoPath = basePath;
            // Create a "Recording" subfolder
            string recordingFolderPath = Path.Combine(videoPath, folderName);

            if (!Directory.Exists(recordingFolderPath))
            {
                Directory.CreateDirectory(recordingFolderPath);
            }

            // Get the directory of the assembly
            return recordingFolderPath;
        }

        public static void EndRecording()
        {
            Process[] processes = Process.GetProcessesByName("ffmpeg");
            foreach (Process process in processes)
            {
                process.CloseMainWindow();
                process.WaitForExit();
            }
            Console.WriteLine("Recording Stopped...");

        }



    }
}