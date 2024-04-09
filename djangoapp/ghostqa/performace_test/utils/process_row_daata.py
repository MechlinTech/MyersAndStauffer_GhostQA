from collections import defaultdict
from datetime import datetime,timedelta

def group_and_average(json_data):
    # Sort JSON data by timestamp
    sorted_json_data = sorted(json_data, key=lambda x: x["timeStamp"])


    # Convert timestamp to datetime
    for data_point in sorted_json_data:
        data_point["datetime"] = datetime.fromtimestamp(data_point["timeStamp"] /1000)
    # Find the total time span covered by the data
    total_time_span = sorted_json_data[-1]["timeStamp"] - sorted_json_data[0]["timeStamp"]
    # Find the total time span covered by the data
    # total_time_span = sorted_json_data[-1]["datetime"] - sorted_json_data[0]["datetime"]
    

    
    # Calculate interval seconds to achieve approximately 10 items per interval
    # interval_seconds_old = total_time_span.total_seconds()  / (len(sorted_json_data) / 10)
    interval_seconds = total_time_span*1000 /  10
    # Initialize dictionary to hold grouped data
    grouped_data = defaultdict(list)

    # Iterate through each data point in the sorted JSON
    for data_point in sorted_json_data:
        # # Calculate the interval timestamp
        # interval_timestamp = data_point["timeStamp"] // (interval_seconds * 1000)
        # Calculate the interval datetime
        interval_datetime = data_point["datetime"].replace(microsecond=0, second=0) + timedelta(milliseconds=interval_seconds)

        # Add data point to the corresponding interval group
        grouped_data[interval_datetime].append(data_point)

    # Initialize list to hold averaged data
    averaged_data = []

    # Calculate average for each group
    for interval, data_points in grouped_data.items():
       # Initialize variables to hold sum of values
        total_connect = 0
        total_latency = 0
        total_elapsed = 0
        total_bandwidth = 0
        total_send_bytes = 0
        total_all_threads = 0
        total_grp_threads = 0
        total_percentile_90 = 0
        total_hits_per_second = 0
        total_errors_per_second = 0

        
        # Iterate through data points in the group
        for data_point in data_points:
            total_connect += data_point.get("Connect", 0) if data_point.get("Connect") is not None else 0
            total_latency += data_point.get("Latency", 0) if data_point.get("Latency") is not None else 0
            total_elapsed += data_point.get("elapsed", 0) if data_point.get("elapsed") is not None else 0
            total_bandwidth += data_point.get("bandwidth", 0) if data_point.get("bandwidth") is not None else 0
            total_send_bytes += data_point.get("sentBytes", 0) if data_point.get("sentBytes") is not None else 0
            total_all_threads += data_point.get("allThreads", 0) if data_point.get("allThreads") is not None else 0
            total_grp_threads += data_point.get("grpThreads", 0) if data_point.get("grpThreads") is not None else 0
            total_percentile_90 += data_point.get("percentile_90", 0) if data_point.get("percentile_90") is not None else 0
            total_hits_per_second += data_point.get("Hits_Per_Second", 0) if data_point.get("Hits_Per_Second") is not None else 0
            total_errors_per_second += data_point.get("Errors_Per_Second", 0) if data_point.get("Errors_Per_Second") is not None else 0

        # Calculate average values
        num_data_points = len(data_points)
        average_connect = total_connect / num_data_points if num_data_points > 0 else 0
        average_latency = total_latency / num_data_points if num_data_points > 0 else 0
        average_elapsed = total_elapsed / num_data_points if num_data_points > 0 else 0
        average_bandwidth = total_bandwidth / num_data_points if num_data_points > 0 else 0
        average_send_bytes = total_send_bytes / num_data_points if num_data_points > 0 else 0
        average_all_threads = total_all_threads / num_data_points if num_data_points > 0 else 0
        average_grp_threads = total_grp_threads / num_data_points if num_data_points > 0 else 0
        average_percentile_90 = total_percentile_90 / num_data_points if num_data_points > 0 else 0
        average_hits_per_second = total_hits_per_second / num_data_points if num_data_points > 0 else 0
        average_errors_per_second = total_errors_per_second / num_data_points if num_data_points > 0 else 0

        # # Append averaged data for the interval
        # averaged_data.append({
        #     "interval_timestamp": interval * interval_seconds * 1000,  # Convert back to milliseconds
        #     "average_connect": average_connect,
        #     "average_latency": average_latency,
        #     "average_elapsed": average_elapsed,
        #     "average_bandwidth": average_bandwidth,
        #     "average_send_bytes": average_send_bytes,
        #     "average_all_threads": average_all_threads,
        #     "average_grp_threads": average_grp_threads,
        #     "average_percentile_90": average_percentile_90,
        #     "average_hits_per_second": average_hits_per_second,
        #     "average_errors_per_second": average_errors_per_second
        # })


        # Append averaged data for the interval
        result = data_points[0].copy()
        # result['interval_timestamp'] = interval * interval_seconds * 1000
        result['interval_datetime'] = interval_datetime.strftime("%Y-%m-%d %H:%M:%S")
        result['Connect'] = average_connect
        result['Latency'] = average_latency
        result['elapsed'] = average_elapsed
        result['bandwidth'] = average_bandwidth
        result['sendBytes'] = average_send_bytes
        result['allThreads'] = average_all_threads
        result['grpThreads'] = average_grp_threads
        result['percentile_90'] = average_percentile_90
        result['Hits_Per_Second'] = average_hits_per_second
        result['Errors_Per_Second'] = average_errors_per_second
        averaged_data.append(result)

    return averaged_data

